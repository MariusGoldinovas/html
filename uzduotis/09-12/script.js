const result = document.querySelector('.result');
let page = 1;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
    const storedTitle = localStorage.getItem('movieTitle');
    const storedYear = localStorage.getItem('movieYear');

    if (storedTitle) {
        document.querySelector('input#title').value = storedTitle;
    }

    if (storedYear) {
        document.querySelector('input#year').value = storedYear;
    }
});


const searchMovies = (e, page, value, year) => {
    if (e) e.preventDefault();

    value = document.querySelector('input').value;
    year = document.querySelector('#year').value;

    
    localStorage.setItem('movieTitle', value);
    localStorage.setItem('movieYear', year);

    const searchLink = `https://www.omdbapi.com/?s=${value}&page=${page}&y=${year}&apikey=4f18b32f`;

    fetch(searchLink)
    .then(resp => resp.json())
    .then(resp => {

        if (resp.Response === "True") {
            resp.Search.forEach(movie => {
                fetchMovieDetails(movie.Title, movie.Year);
            });
            
            totalPages = Math.ceil(resp.totalResults / 10);
            
            if (totalPages > 1) {
                document.querySelector('.nav').style.display = 'flex';
                document.querySelector('.page-number').textContent = `Page ${page} of ${totalPages}`;
            } else {
                document.querySelector('.nav').style.display = 'none';
            }

            document.querySelector('.back').style.display = page === 1 ? 'none' : 'inline';
            document.querySelector('.next').style.display = page >= totalPages ? 'none' : 'inline';
        } else {
            result.innerHTML = `<p>No results found.</p>`;
            document.querySelector('.nav').style.display = 'none';
        }
    });
}

const fetchMovieDetails = (title, year) => {
    const plot = document.querySelector('select[name="plot"]').value;
    const plotLink = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=4f18b32f`;

    fetch(plotLink)
        .then(resp => resp.json())
        .then(movie => {
            if (movie.Response === "True") {
                const movieCard = `
                    <div class="card">
                        <h4>${movie.Title} (${movie.Year})</h4>
                        <p><strong>Plot:</strong> ${movie.Plot}</p>
                        <div class="image">
                            <img src="${movie.Poster}" alt="">
                        </div>
                    </div>
                `;
                result.innerHTML += movieCard; 
            } else {
                result.innerHTML += `<p>Movie details not found for "${title}" (${year}).</p>`;
            }
        });
}

document.querySelector('.input').addEventListener('submit', (e) => {
    page = 1;
    searchMovies(e, page);
});

document.querySelector('.next').addEventListener('click', (e) => {
    if (page < totalPages) {
        page++;
        const value = document.querySelector('input').value;
        const year = document.querySelector('#year').value;
        searchMovies(null, page, value, year);
    }
});

document.querySelector('.back').addEventListener('click', (e) => {
    if (page > 1) {
        page--;
        const value = document.querySelector('input').value;
        const year = document.querySelector('#year').value;
        searchMovies(null, page, value, year);
    }
});

document.querySelector('#resetBtn').addEventListener('click', () => {

    localStorage.removeItem('movieTitle');
    localStorage.removeItem('movieYear');

    document.querySelector('input#title').value = '';
    document.querySelector('input#year').value = '';

    result.innerHTML = '';
    document.querySelector('.nav').style.display = 'none'; 
});