const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Afficher les films tendances
async function getTrendingMovies(maxPages = 10) {
    const trendingMovies = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
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
    if (!grid) return;

    grid.innerHTML = '';
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('case1');
        const img = document.createElement('img');
        img.src = movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300?text=Pas+de+photo';
        img.alt = movie.title || 'Film tendance';
        div.appendChild(img);
        div.addEventListener('click', () => {
            openPopupWithInfo(movie);
        });
        grid.appendChild(div);
    });
}

// Afficher les séries tendances
async function getTrendingSeries(maxPages = 10) {
    const trendingSeries = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
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
    if (!grid) return;

    grid.innerHTML = '';
    series.forEach(serie => {
        const div = document.createElement('div');
        div.classList.add('case2');
        const img = document.createElement('img');
        img.src = serie.poster_path ? IMAGE_BASE_URL + serie.poster_path : 'https://via.placeholder.com/200x300?text=Pas+de+photo';
        img.alt = serie.name || 'Série tendance';
        div.appendChild(img);
        div.addEventListener('click', () => {
            openPopupWithInfo(serie);
        });
        grid.appendChild(div);
    });
}

// Récupérer le film le plus populaire
async function getTopTrendingMovie() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR&page=1`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        return data.results[0]; // Le film le plus populaire
    } catch (error) {
        console.error('Erreur récupération du film le plus tendance :', error);
        return null;
    }
}

// Récupérer l'URL de la bande-annonce YouTube
async function getTrailerUrl(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=fr-FR`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return trailer ? `https://www.youtube.com/embed/${trailer.key}?controls=1` : null;
    } catch (error) {
        console.error('Erreur récupération de la bande annonce :', error);
        return null;
    }
}

// Afficher la bande-annonce du film populaire
async function displayTopTrendingMovieTrailer() {
    const movie = await getTopTrendingMovie();
    if (!movie) return;

    const trailerUrl = await getTrailerUrl(movie.id);
    if (!trailerUrl) {
        console.error("Bande annonce non trouvée.");
        return;
    }

    const grid = document.querySelector('.grid3');
    if (!grid) {
        console.error("La grille '.grid3' n'existe pas.");
        return;
    }

    let case3 = grid.querySelector('.case3');
    if (!case3) {
        case3 = document.createElement('div');
        case3.classList.add('case3');
        grid.appendChild(case3);
    }
    case3.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = trailerUrl;
    iframe.classList.add('iframe1');
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;";

    case3.appendChild(iframe);
}
document.addEventListener('DOMContentLoaded', () => {
    getTrendingMovies();
    getTrendingSeries();
    displayTopTrendingMovieTrailer();
});




async function openPopupWithInfo(item) {
    const overlay = document.getElementById('popupOverlay');
    const text = document.getElementById('popupText');
    const iframe = document.getElementById('popupIframe');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    // Détecter si c'est un film ou une série
    const isMovie = item.title !== undefined;
    const isSerie = item.name !== undefined;

    let title = isMovie ? item.title : item.name;
    let releaseDate = item.release_date || item.first_air_date || 'Inconnue';
    let overview = item.overview || 'Pas de description disponible.';
    let genres = item.genres ? item.genres.map(genre => genre.name).join(', ') : 'Inconnu';
    let duration = isMovie ? (item.runtime ? `${item.runtime} min` : 'Durée inconnue') :
        (item.episode_run_time ? `${item.episode_run_time[0]} min` : 'Durée inconnue');

    if (addToWishlistBtn) {
    addToWishlistBtn.addEventListener('click', () => {
        addToWishlistBtn.classList.add('added');

        // Construire un objet
        const wishlistItem = {
            id: item.id,
            title: item.title || item.name,
            image: item.poster_path,
            type: item.title ? 'movie' : 'series'
        };

        // Récupérer la wishlist existante
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.some(el => el.id === wishlistItem.id && el.type === wishlistItem.type);

        if (!exists) {
            wishlist.push(wishlistItem);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    });
}


    text.innerHTML = `
    <h2>${title}</h2>
    <p>${overview}</p>
    <p><strong>Date de sortie :</strong> ${releaseDate}</p>
    <p><strong>Genre(s) :</strong> ${genres}</p>
    <p><strong>Durée :</strong> ${duration}</p>
  `;

    if (isMovie) {
        // Pour les films, afficher l'iframe avec la vidéo
        const trailerUrl = await getTrailerUrl(item.id);
        iframe.src = trailerUrl || '';
        iframe.style.display = 'block';
    } else {
        // Pour les séries, ne pas afficher l'iframe
        iframe.src = '';
        iframe.style.display = 'none';
    }

    overlay.classList.add('show');

    setTimeout(() => {
        document.querySelector('#popupContent').style.opacity = 1;
    }, 10);
}
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('popupOverlay');
    const popupContent = document.getElementById('popupContent');

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => {
                popupContent.style.opacity = 0;
            }, 300);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
                setTimeout(() => {
                    popupContent.style.opacity = 0;
                }, 300);
            }
        });
    }
});
