const API_URL = 'https://jsonplaceholder.typicode.com';
        
const userGrid = document.getElementById('userGrid');
const loadingEl = document.getElementById('loading');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const cancelBtn = document.getElementById('cancelBtn');
const createPostForm = document.getElementById('createPostForm');

let currentAbortController = null;


async function fetchUsers() {
    
    currentAbortController = new AbortController();
    userGrid.innerHTML = '';
    errorContainer.style.display = 'none';
    loadingEl.style.display = 'block';
    cancelBtn.style.display = 'inline-block';

    try {
    
        const response = await fetch(`${API_URL}/users`, {signal: currentAbortController.signal});
        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        
        if (!Array.isArray(data) || data.some(user => !user.id || !user.name || !user.email || !user.address)) {
            throw new Error('Invalid structure.');
        }

        renderUsers(data);
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Canceled.');
            return;
        }
        showError(err.message);
    } finally {
        loadingEl.style.display = 'none';
        cancelBtn.style.display = 'none';
        currentAbortController = null;
    }
}

function renderUsers(users) {
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.userId = user.id;

        card.innerHTML = `
            <div>
                <h3>${escapeHtml(user.name)}</h3>
                <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
                <p><strong>City:</strong> ${escapeHtml(user.address.city)}</p>
            </div>
            <div>
                <button onclick="toggleUserPosts(${user.id}, this)">Publics</button>
                <div class="posts-container" id="posts-${user.id}" style="display: none;"></div>
            </div>`;
        userGrid.appendChild(card);
    });
}

async function toggleUserPosts(userId, buttonEl) {
    const container = document.getElementById(`posts-${userId}`);
    if (container.style.display === 'block') {
        container.style.display = 'none';
        buttonEl.textContent = 'Publics';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = '<em>Loading...</em>';
    buttonEl.textContent = 'Hide';

    try {
        const response = await fetch(`${API_URL}/posts?userId=${userId}`);
        if (!response.ok) throw new Error('Can`t load publications');
        
        const posts = await response.json();
        renderPosts(posts, container);
    } catch (err) {
        container.innerHTML = `<span style="color: red;">${err.message}</span>`;
    }
}


function renderPosts(posts, container) {
    if (posts.length === 0) {
        container.innerHTML = '<p>No publications</p>';
        return;
    }

    container.innerHTML = '';
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.id = `post-${post.id}`;
        postItem.innerHTML = `
            <span class="post-title-text">${escapeHtml(post.title)}</span>
            <div class="post-actions">
                <button class="warning" onclick="patchPostTitle(${post.id})">Edit</button>
                <button class="danger" onclick="deletePost(${post.id})">Delete</button>
            </div>
            `;
        container.appendChild(postItem);
    });
}


createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPost = {
        userId: Number(document.getElementById('userIdInput').value),
        title: document.getElementById('titleInput').value,
        body: document.getElementById('bodyInput').value
    };

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error('Error');

        const created = await response.json();
        alert(`Created successfuly! ID: ${created.id}`);
        createPostForm.reset();
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
});

async function patchPostTitle(postId) {
    const newTitle = prompt('Enter title:');
    if (!newTitle) return;

    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ title: newTitle })
        });

        if (!response.ok) throw new Error('Error, can`t update publication');

        const updated = await response.json();
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
            postElement.querySelector('.post-title-text').textContent = updated.title;
        }
        alert('Title updated successfuly!');
    } catch (err) {
    alert(`Error: ${err.message}`);
    }
}

async function deletePost(postId) {
    if (!confirm('Are you sure?')) return;

    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Can't delete publication`);

        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
            postElement.remove();
        }
        alert('Successfuly deleted !');
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
}


function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
}

retryBtn.addEventListener('click', fetchUsers);

cancelBtn.addEventListener('click', () => {
    if (currentAbortController) {
        currentAbortController.abort();
    }
});


function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

fetchUsers();