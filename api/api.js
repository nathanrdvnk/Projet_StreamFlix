const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

//Films tendances
async function getTrendingMovies(maxPages = 10) {
    const trendingMovies = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            trendingMovies.push(...data.results);
        }
        displayTrendingMovies(trendingMovies);
    } catch (error) {
        console.error('Erreur lors de la récupération des films tendances :', error);
    }
}

function displayTrendingMovies(movies) {
    const grid = document.querySelector('.grid1');
    grid.innerHTML = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('case1');
        const img = document.createElement('img');
        img.src = movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300?text=Pas+de+photo';
        div.appendChild(img);
        grid.appendChild(div);
    });
}


//Séries Tendances
async function getTrendingSeries(maxPages = 10) {
    const trendingSeries = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            trendingSeries.push(...data.results);
        }
        displayTrendingSeries(trendingSeries);
    } catch (error) {
        console.error('Erreur lors de la récupération des séries tendances :', error);
    }
}

function displayTrendingSeries(series) {
    const grid = document.querySelector('.grid2');
    grid.innerHTML = '';

    series.forEach(serie => {
        const div = document.createElement('div');
        div.classList.add('case2');
        const img = document.createElement('img');
        img.src = serie.poster_path ? IMAGE_BASE_URL + serie.poster_path : 'https://via.placeholder.com/200x300?text=Pas+de+photo';
        div.appendChild(img);
        grid.appendChild(div);
    });
}

getTrendingMovies();
getTrendingSeries();

//Le Film le plus Tendance
async function getTopTrendingMovie() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR&page=1`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        const topMovie = data.results[0];

        console.log('Film le plus tendance :', topMovie);
        return topMovie;
    } catch (error) {
        console.error('Erreur lors de la récupération du film le plus tendance :', error);
    }
}

//La Série la plus Tendance
async function getTopTrendingSeries() {
    try {
        const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=fr-FR&page=1`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        const topSeries = data.results[0];
        console.log('Série la plus tendance :', topSeries);
        return topSeries;
    } catch (error) {
        console.error('Erreur lors de la récupération de la série la plus tendance :', error);
    }
}



// Info : L’API TMDb limite à 40 requêtes toutes les 10 secondes pour les utilisateurs sans compte pro.