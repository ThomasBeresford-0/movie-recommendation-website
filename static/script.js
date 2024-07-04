$(document).ready(function() {
    var moviesData = []; // Array to store fetched movies data

    // Function to fetch popular movies from Flask backend
    function fetchMovies() {
        $.ajax({
            url: '/movies', // Flask route to fetch movies
            type: 'GET',
            success: function(data) {
                moviesData = data.results; // Store movie results in moviesData array
                displayMoviesGrid();
            },
            error: function(error) {
                console.error('Error fetching movies:', error);
            }
        });
    }

    // Function to display movie posters in the grid
    function displayMoviesGrid() {
        var moviesGrid = $('#moviesGrid');
        moviesGrid.empty(); // Clear previous content

        moviesData.forEach(function(movie) {
            var posterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            var movieLink = $('<a>').attr('href', '/movie/' + movie.id);
            var poster = $('<img>').attr('src', posterUrl).addClass('movie-poster');
            movieLink.append(poster);
            moviesGrid.append(movieLink);
        });
    }

    // Fetch movies when the page loads
    fetchMovies();
});
