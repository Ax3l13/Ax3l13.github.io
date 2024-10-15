const movieDatabase = [
    {
        title: "The Shining",
        genre: "Horreur",
        poster: "https://m.media-amazon.com/images/I/81TtZbwqzLL._AC_SY679_.jpg",
        actors: ["Jack Nicholson", "Shelley Duvall"],
        trailer: "url/to/trailerA",
        pagedufilm: "theshining.html"
    },
    {
        title: "Superbad",
        genre: "Comédie",
        poster: "https://m.media-amazon.com/images/I/71AiF9s8ScL._AC_SY679_.jpg",
        actors: ["Jonah Hill", "Michael Cera"],
        trailer: "url/to/trailerC",
        pagedufilm: "superbad.html"
    },
    {
        title: "Mad Max: Fury Road",
        genre: "Action",
        poster: "https://m.media-amazon.com/images/I/81+R7PEfqXL._AC_SY679_.jpg",
        actors: ["Tom Hardy", "Charlize Theron"],
        trailer: "url/to/trailerE",
        pagedufilm: "madmaxfuryroad.html"
    },
    {
        title: "The Godfather",
        genre: "Drame",
        poster: "https://m.media-amazon.com/images/I/71K9Fgw9bJL._AC_SY679_.jpg",
        actors: ["Marlon Brando", "Al Pacino"],
        trailer: "url/to/trailerG",
        pagedufilm: "thegodfather.html"
    },
    {
        title: "Blade Runner",
        genre: "Science-Fiction",
        poster: "https://m.media-amazon.com/images/I/71SGhJHjrPL._AC_SY679_.jpg",
        actors: ["Harrison Ford", "Rutger Hauer"],
        trailer: "url/to/trailerI",
        pagedufilm: "bladerunner.html"
    },
    {
        title: "Se7en",
        genre: "Thriller",
        poster: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        actors: ["Brad Pitt", "Morgan Freeman"],
        trailer: "url/to/trailerL",
        pagedufilm: "se7en.html"
    },
    {
        title: "Indiana Jones: Raiders of the Lost Ark",
        genre: "Aventure",
        poster: "https://m.media-amazon.com/images/I/71Wcm0RIPbL._AC_SY679_.jpg",
        actors: ["Harrison Ford", "Karen Allen"],
        trailer: "url/to/trailerM",
        pagedufilm: "indianajonesraidersofthelostark.html"
    },
    {
        title: "Toy Story",
        genre: "Animation",
        poster: "https://m.media-amazon.com/images/I/71aG+HHyqPL._AC_SY679_.jpg",
        actors: ["Tom Hanks", "Tim Allen"],
        trailer: "url/to/trailerO",
        pagedufilm: "toystory.html"
    },
    {
        title: "The Pursuit of Happyness",
        genre: "Biographie",
        poster: "https://m.media-amazon.com/images/I/71VJ5Z2eO9L._AC_SY679_.jpg",
        actors: ["Will Smith", "Jaden Smith"],
        trailer: "url/to/trailerQ",
        pagedufilm: "thepursuitofhappyness.html"
    },
    {
        title: "The Departed",
        genre: "Crime",
        poster: "https://m.media-amazon.com/images/I/71tqDP7aaDL._AC_SY679_.jpg",
        actors: ["Leonardo DiCaprio", "Matt Damon"],
        trailer: "url/to/trailerS",
        pagedufilm: "thedeparted.html"
    },
    {
        title: "13th",
        genre: "Documentaire",
        poster: "https://m.media-amazon.com/images/I/71wLYU7-1NL._AC_SY679_.jpg",
        actors: ["Angela Davis", "Bryan Stevenson"],
        trailer: "url/to/trailerV",
        pagedufilm: "13th.html"
    },
    {
        title: "Finding Nemo",
        genre: "Famille",
        poster: "https://m.media-amazon.com/images/I/71bHJt1BBoL._AC_SY679_.jpg",
        actors: ["Albert Brooks", "Ellen DeGeneres"],
        trailer: "url/to/trailerW",
        pagedufilm: "findingnemo.html"
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        genre: "Fantaisie",
        poster: "https://m.media-amazon.com/images/I/81EBpFSB3DL._AC_SY679_.jpg",
        actors: ["Elijah Wood", "Ian McKellen"],
        trailer: "url/to/trailerX",
        pagedufilm: "thelordoftheringsfellowshipofthering.html"
    },
    {
        title: "Sunset Boulevard",
        genre: "Film Noir",
        poster: "https://m.media-amazon.com/images/I/81fK38s4z9L._AC_SY679_.jpg",
        actors: ["William Holden", "Gloria Swanson"],
        trailer: "url/to/trailerY",
        pagedufilm: "sunsetboulevard.html"
    },
    {
        title: "Schindler's List",
        genre: "Histoire",
        poster: "https://m.media-amazon.com/images/I/81RllC69EJL._AC_SY679_.jpg",
        actors: ["Liam Neeson", "Ralph Fiennes"],
        trailer: "url/to/trailerZ",
        pagedufilm: "schindlerslist.html"
    },
    {
        title: "La La Land",
        genre: "Comédie Musicale",
        poster: "https://m.media-amazon.com/images/I/81vl2XVLPRL._AC_SY679_.jpg",
        actors: ["Ryan Gosling", "Emma Stone"],
        trailer: "url/to/trailerAA",
        pagedufilm: "lalaland.html"
    },
    {
        title: "Inception",
        genre: "Mystère",
        poster: "https://m.media-amazon.com/images/I/81pWtM4u8RL._AC_SY679_.jpg",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
        trailer: "url/to/trailerBB",
        pagedufilm: "inception.html"
    },
    {
        title: "Titanic",
        genre: "Romance",
        poster: "https://m.media-amazon.com/images/I/719NkvvWnHL._AC_SY679_.jpg",
        actors: ["Leonardo DiCaprio", "Kate Winslet"],
        trailer: "url/to/trailerCC",
        pagedufilm: "titanic.html"
    },
    {
        title: "Piper",
        genre: "Court-métrage",
        poster: "https://m.media-amazon.com/images/I/71yXyOQSiLL._AC_SY679_.jpg",
        actors: ["Aucune"],
        trailer: "url/to/trailerDD",
        pagedufilm: "piper.html"
    },
    {
        title: "Rocky",
        genre: "Sport",
        poster: "https://m.media-amazon.com/images/I/81qfQVEqK-L._AC_SY679_.jpg",
        actors: ["Sylvester Stallone", "Talia Shire"],
        trailer: "url/to/trailerEE",
        pagedufilm: "rocky.html"
    },
    { 
        title: "The Avengers", 
        genre: "Super-héros", 
        poster: "https://m.media-amazon.com/images/I/81TK0VG11rL._AC_SY679_.jpg", 
        actors: ["Robert Downey Jr.", "Chris Evans"], 
        trailer: "url/to/trailerFF", 
        pagedufilm: "theavengers.html" 
    }, 
    { 
        title: "Saving Private Ryan", 
        genre: "Guerre", 
        poster: "https://m.media-amazon.com/images/I/71bnMfcfu4L._AC_SY679_.jpg", 
        actors: ["Tom Hanks", "Matt Damon"], 
        trailer: "url/to/trailerGG", 
        pagedufilm: "savingprivateryan.html" 
    }, 
    { 
        title: "The Good, the Bad and the Ugly", 
        genre: "Western", 
        poster: "https://m.media-amazon.com/images/I/81PvxddTddL._AC_SY679_.jpg", 
        actors: ["Clint Eastwood", "Eli Wallach"], 
        trailer: "url/to/trailerHH", 
        pagedufilm: "thegoodthebadandtheugly.html" 
    }
];
