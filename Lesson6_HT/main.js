let goals = [
    { id: 1, text: "Learn DOM.", completed: false },
    { id: 2, text: "Make first site.", completed: false },
    { id: 3, text: "Learn CXX.", completed: false },
    { id: 4, text: "Do homework.", completed: false }
];

let currentFilter = 'all';

const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const errorMsg = document.getElementById('errorMsg');
const goalList = document.getElementById('goalList');
const counter = document.getElementById('counter');
const emptyMessage = document.getElementById('emptyMessage');
const filterBtns = document.querySelectorAll('.filter-btn');

function render() {
    goalList.innerHTML = '';

    const filteredGoals = goals.filter(goal => {
        if (currentFilter === 'active') return !goal.completed;
        if (currentFilter === 'completed') return goal.completed;
        return true; 
    });


    if (goals.length === 0) {
        emptyMessage.textContent = 'No tasks...';
        emptyMessage.hidden = false;
    } else if (filteredGoals.length === 0) {
        emptyMessage.textContent = 'Tasks not found';
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }

    filteredGoals.forEach(goal => {
        const li = document.createElement('li');
        li.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        li.dataset.id = goal.id;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'goal-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = goal.completed;
        checkbox.className = 'goal-checkbox';

        const span = document.createElement('span');
        span.className = 'goal-text';
        span.textContent = goal.text; 

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        goalList.appendChild(li);
    });

    const total = goals.length;
    const completedCount = goals.filter(g => g.completed).length;
    counter.textContent = `All: ${total}. Done: ${completedCount}`;
}

goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const text = goalInput.value.trim(); 

    if (text.length < 3 || text.length > 100) {
        errorMsg.textContent = 'task must be between 3 and 100 symbols.';
        return;
    }

    const newGoal = {
        id: Date.now(),
        text: text,
        completed: false
    };

    goals.push(newGoal);

    goalInput.value = '';
    goalInput.focus();

    render();
});

goalList.addEventListener('click', (e) => {
    const li = e.target.closest('.goal-item');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        goals = goals.filter(g => g.id !== id);
        render();
        return;
    }

    if (e.target.classList.contains('goal-checkbox')) {
        const goal = goals.find(g => g.id === id);
        if (goal) {
            goal.completed = e.target.checked;
            render(); 
        }
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

render();