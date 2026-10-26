const API_KEY = 'YOUR_API_KEY'; // Замініть на ваш ключ OMDB API
const searchBtn = document.getElementById('searchBtn');
const searchTitleInput = document.getElementById('searchTitle');
const searchTypeSelect = document.getElementById('searchType');
const moviesListDiv = document.getElementById('moviesList');
const paginationDiv = document.getElementById('pagination');
const messageDiv = document.getElementById('message');
const movieDetailsDiv = document.getElementById('movieDetails');

let currentQuery = '';
let currentType = '';
let currentPage = 1;

// Подія кліку на кнопку "Search"
searchBtn.addEventListener('click', () => {
    currentQuery = searchTitleInput.value.trim();
    currentType = searchTypeSelect.value;
    currentPage = 1;

    if (!currentQuery) {
        messageDiv.innerHTML = '<p class="error">Будь ласка, введіть назву фільму!</p>';
        moviesListDiv.innerHTML = '';
        paginationDiv.innerHTML = '';
        movieDetailsDiv.style.display = 'none';
        return;
    }

    fetchMovies(currentQuery, currentType, currentPage);
});

// Функція для запиту списку фільмів через AJAX (Fetch API)
function fetchMovies(title, type, page) {
    messageDiv.innerHTML = 'Завантаження...';
    moviesListDiv.innerHTML = '';
    paginationDiv.innerHTML = '';
    movieDetailsDiv.style.display = 'none';

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`;
    if (type) {
        url += `&type=${type}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            messageDiv.innerHTML = '';
            if (data.Response === 'True') {
                displayMovies(data.Search);
                setupPagination(data.totalResults, page);
            } else {
                messageDiv.innerHTML = `<p class="error">Movie not found!</p>`;
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            messageDiv.innerHTML = `<p class="error">Сталася помилка при запиті до сервера.</p>`;
        });
}

// Відображення списку фільмів
function displayMovies(movies) {
    moviesListDiv.innerHTML = '<h2>Результати пошуку:</h2>';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <span>${movie.Title} (${movie.Year})</span>
            <button onclick="fetchMovieDetails('${movie.imdbID}')">Details</button>
        `;
        moviesListDiv.appendChild(movieItem);
    });
}

// Налаштування пагінації (OMDB повертає по 10 результатів на сторінку)
function setupPagination(totalResults, currentPage) {
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(totalResults / 10);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            fetchMovies(currentQuery, currentType, currentPage);
        });
        paginationDiv.appendChild(pageBtn);
    }
}

// Запит детальної інформації про фільм за його imdbID
function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                movieDetailsDiv.style.display = 'block';
                movieDetailsDiv.innerHTML = `
                    <h3>${data.Title} (${data.Year})</h3>
                    <p><strong>Жанр:</strong> ${data.Genre}</p>
                    <p><strong>Режисер:</strong> ${data.Director}</p>
                    <p><strong>Актори:</strong> ${data.Actors}</p>
                    <p><strong>Сюжет:</strong> ${data.Plot}</p>
                    <p><strong>Рейтинг IMDb:</strong> ${data.imdbRating}</p>
                    ${data.Poster !== 'N/A' ? `<img src="${data.Poster}" alt="Poster" width="150">` : ''}
                `;
                // Плавна прокрутка до блоку з деталями
                movieDetailsDiv.scrollIntoView({ behavior: 'smooth' });
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
}

