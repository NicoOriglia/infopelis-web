document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('searchButton').addEventListener('click', () => {
    visibleComingsoon.classList.remove('comingsoon-visible')
    visibleRecommended.classList.remove('recommended-visible')

});


const visibleComingsoon = document.querySelector('.comingsoon')
const visibleRecommended = document.querySelector('.recommended')
const selectComingsoon = document.querySelector('.select-comingsoon')
const selectRecommended = document.querySelector('.select-recommended')

selectComingsoon.addEventListener('click', ()=> {
    visibleComingsoon.classList.add('comingsoon-visible')
    visibleRecommended.classList.remove('recommended-visible')

    resultContainer.innerHTML = ''; // Limpiar el contenido aquí
})

selectRecommended.addEventListener('click', () => {
    visibleRecommended.classList.add('recommended-visible')
    visibleComingsoon.classList.remove('comingsoon-visible')
    resultContainer.innerHTML = ''; // Limpiar el contenido aquí
})


let api_key = '32cdb3df2c34d39f5671646e3c86f762';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';
let resultContainer = document.getElementById('results');

const maxLength = 10; // Cambia 10 por la longitud deseada

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...';
    let searchInput = document.getElementById('searchInput').value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results));
}

function displayMovies(movies) {
    resultContainer.innerHTML = '';

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h3');
        title.textContent = truncar(movie.title, maxLength);

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let postePath = urlImg + movie.poster_path;
        let poster = document.createElement('img');

        let vote = document.createElement('span');
        vote.className = "vote";
        vote.textContent = 'TMDB: ' + movie.vote_average.toFixed(1);

        poster.src = postePath;
        
        movieDiv.appendChild(title);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);
        movieDiv.appendChild(vote);

        resultContainer.appendChild(movieDiv);
    });
}

const truncar = (title, longitud) => (title.length > longitud ? `${title.substring(0, longitud)}...` : title);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmNkYjNkZjJjMzRkMzlmNTY3MTY0NmUzYzg2Zjc2MiIsIm5iZiI6MTcxOTQ0OTE3Ny4wODAwNzgsInN1YiI6IjY2MmM3NDZkMDNiZjg0MDEyOGVhMThjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KXh03ymUqnjD1oJsjm5TAKpwTiru-OXtYjUgFCEYlqQ'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1', options)
    .then(response => response.json())
    .then(response => {
        const results = response.results;
        const container = document.querySelector('.results-recommended');

        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-lateral');

            movieDiv.innerHTML = `
                <h3>${truncar(movie.title, maxLength)}</h3>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <span>TMDB: ${movie.vote_average.toFixed(1)}</span>
            `;

            container.appendChild(movieDiv);
        });
    })
    .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1', options)
    .then(response => response.json())
    .then(response => {
        const resultsComingSoon = response.results;
        const containerNow = document.querySelector('.results-comingsoon');

        resultsComingSoon.forEach(movie => {
            const comingsoonDiv = document.createElement('div');
            comingsoonDiv.classList.add('movie-lateral');

            comingsoonDiv.innerHTML = `
                <h3>${truncar(movie.title, maxLength)}</h3>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <span>TMDB: ${movie.vote_average.toFixed(1)}</span>
            `;
            containerNow.appendChild(comingsoonDiv);
        });
    })
    .catch(err => console.error(err));
