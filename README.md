<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
<style>
    body {
        background-color: #141414;
        color: white;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    header {
        width: 100%;
        background-color: #222;
        padding: 10px;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .container {
        margin-top: 70px; /* Espace pour le header */
        padding: 20px;
    }
    .category {
        margin-bottom: 40px;
    }
    .category h2 {
        margin-bottom: 10px;
    }
    .film-container {
        display: flex;
        overflow-x: auto;
    }
    .film {
        background-color: #333;
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        flex: 0 0 auto;
        width: 200px;
        height: 300px; /* Hauteur initiale */
        text-align: center;
        position: relative;
        transition: height 0.3s;
        overflow: hidden; /* Masque le contenu débordant */
    }
    .film img {
        width: 100%;
        border-radius: 5px;
    }
    .film-title {
        position: absolute;
        bottom: -90px; /* Position initiale en dehors de la vue pour les titres plus longs */
        left: 0;
        width: 100%;
        background-color: #333; /* Correspondance avec le fond de .film */
        color: white; /* Couleur du texte */
        font-size: 1.2em; /* Augmente la taille du texte */
        padding: 5px 0; /* Réduit l'espace vertical */
        font-family: "Comic Sans MS", "Comic Sans", cursive; /* Police arrondie */
        transition: bottom 0.3s; /* Transition douce pour l'apparition du titre */
    }
    .film:hover .film-title {
        bottom: 0; /* Fait remonter le titre à la vue */
    }
    .film:hover {
        height: 360px; /* Augmente la hauteur au survol */
        cursor: pointer; /* Change le curseur en main au survol */
    }
    .hidden {
        display: none;
    }
</style>
</head>
<body>
    <iframe src="header.html" style="width: 100%; height: 60px; border: none;"></iframe>
    <br>
    <div class="container" id="movieCategories">
        <!-- Categories will be loaded here -->
    </div>
    <script src="database.js"></script>
    <script>
        // Catégories de films à afficher
        const categories = [
          'Recommandé pour ?/user/?', 'Action', 'Aventure', 'Animation', 'Biographie', 
          'Comédie', 'Crime', 'Documentaire', 'Drame', 'Famille', 'Fantaisie', 
          'Film Noir', 'Histoire', 'Horreur', 'Comédie Musicale', 'Mystère', 
          'Romance', 'Science-Fiction', 'Court-métrage', 'Sport', 'Super-héros', 
          'Thriller', 'Guerre', 'Western'
        ];

        // Mélange les éléments d'un tableau
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
// Charge les films par genre
function loadMoviesByGenre(genre) {
    if (genre.toLowerCase() === 'recommandé pour ?/user/?') {
        const shuffledMovies = [...movieDatabase];
        shuffle(shuffledMovies);
        return shuffledMovies.slice(0, 20); // Prend 20 films aléatoires
    } else {
        const filteredMovies = movieDatabase.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
        shuffle(filteredMovies);
        return filteredMovies.slice(0, 20); // Prend 20 films aléatoires pour les autres genres
    }
}

function loadMovies(category, movies) {
    const container = document.createElement('div');
    container.className = 'category';
    container.innerHTML = `<h2>${category}</h2><div class="film-container" id="${category.toLowerCase()}"></div>`;
    document.getElementById('movieCategories').appendChild(container);
    const filmContainer = container.querySelector('.film-container');
    movies.forEach(movie => {
        const film = document.createElement('div');
        film.className = 'film';
        film.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="film-title">${movie.title}</div>
        `;
        film.addEventListener("click", () => {
            window.location.href = movie.pagedufilm;
        });
        filmContainer.appendChild(film);
    });
}

    document.addEventListener('DOMContentLoaded', () => {
        fetch('database.json')
            .then(response => response.json())
            .then(data => {
                movieDatabase = data;
                shuffle(categories);
                categories.forEach(category => {
                    const movies = loadMoviesByGenre(category);
                    if (movies.length > 0) {
                        loadMovies(category, movies);
                    }
                });
            });
    });


        // Charge les catégories et les films aléatoires
        document.addEventListener('DOMContentLoaded', () => {
            shuffle(categories);
            categories.forEach(category => {
                const movies = loadMoviesByGenre(category);
                if (movies.length > 0) {
                    loadMovies(category, movies);
                }
            });
        });
    </script>
</body>
</html>
