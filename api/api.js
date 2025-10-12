const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getAllMovies(maxPages = 3) {
    const allMovies = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            allMovies.push(...data.results);
        }
        displayMovies(allMovies);
        return allMovies;
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
    }
}

function displayMovies(movies) {
  const grid = document.querySelector('.grid2');
  grid.innerHTML = '';

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('case2');

    const img = document.createElement('img');
    img.src = movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300?text=Pas+de+photo';

    div.appendChild(img);
    grid.appendChild(div);
  });
}
getAllMovies(3);


// Info : L’API TMDb limite à 40 requêtes toutes les 10 secondes pour les utilisateurs sans compte pro.