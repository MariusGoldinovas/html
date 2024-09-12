const result = document.querySelector('.result');
let page = 1;

const searchMovies = (e, page, value = null, year = null) => {
    if (e) e.preventDefault();

    if (!value) {
        value = document.querySelector('input').value;
    }
    if (!year) {
        year = document.querySelector('#year').value;
    }


    fetch(`https://www.omdbapi.com/?s=${value}&page=${page}&y=${year}&apikey=4f18b32f`) 
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.Search.map(data => `
            <div class="card">
                <div class="image">
                    <img src="${data.Poster}" alt="">
                </div>
                <h4>${data.Title} - ${data.Year} - </h4>
            </div>
        `);

        result.innerHTML  = `<div class="row">${data.join('')}</div>`;

        let totalPages = Math.ceil(resp.totalResults / 10);
        
        if (totalPages > 1) {
            document.querySelector('.nav').style.display = 'flex';
            document.querySelector('.page-number').textContent = page;
        } else {
            document.querySelector('.nav').style.display = 'none';
        }

        // back button visibility
        document.querySelector('.back').style.display = page === 1 ? 'none' : 'inline';

        // next button visibility
        document.querySelector('.next').style.display = page >= totalPages ? 'none' : 'inline';

    });
}

const getMovieDetails = (movieId) => {
    const plot =document.querySelector('select[name="plot"]').value
    fetch(`https://www.omdbapi.com/?i=${movieID}&plot=${plot}&apikey=4f18b32f`)
    .then(resp => resp.json())
    .then(data =>{
        result.innerHTML = `
            <div class="card">
                <div class="image">
                    <img src="${data.Poster}" alt="">
                </div>
                <h4>${data.Title} - ${data.Year} - </h4>
                <p>${data.Plot}</p>
            </div>
        `;
    })
}


// page reset
document.querySelector('.input').addEventListener('submit', (e) => {
    page = 1; 

    searchMovies(e, page, null, null);
});

document.querySelector('.next').addEventListener('click', () => {
    page++;
    const value = document.querySelector('input').value;
    const year = document.querySelector('#year').value;
    searchMovies(null, page, value, year);
});

document.querySelector('.back').addEventListener('click', () => {
    if (page > 1) {
        page--;
        const value = document.querySelector('input').value;
        const year = document.querySelector('#year').value;
        searchMovies(null, page, value, year);
    }
});
