$(document).ready(function() {
    var popularMovies = []; // Array to store fetched popular movies data
    var searchResults = []; // Array to store fetched search results

    // Function to fetch popular movies from Flask backend
    function fetchPopularMovies() {
        $.ajax({
            url: '/movies', // Flask route to fetch popular movies (modify as per your Flask setup)
            type: 'GET',
            success: function(data) {
                popularMovies = data.results; // Store popular movie results in popularMovies array
                displayPopularMovies();
            },
            error: function(error) {
                console.error('Error fetching popular movies:', error);
            }
        });
    }

    // Function to display popular movie posters in the grid
    function displayPopularMovies() {
        var moviesGrid = $('#moviesGrid');
        moviesGrid.empty(); // Clear previous content

        popularMovies.forEach(function(movie) {
            var posterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            var poster = $('<img>').attr('src', posterUrl).addClass('movie-poster');
            poster.click(function() {
                window.location.href = '/movie/' + movie.id; // Navigate to movie details page
            });
            moviesGrid.append(poster);
        });
    }

    // Function to fetch search results from Flask backend
    function searchMovies(query) {
        $.ajax({
            url: '/search?q=' + query, // Flask route to search movies (modify as per your Flask setup)
            type: 'GET',
            success: function(data) {
                searchResults = data.results; // Store search results in searchResults array
                displaySearchResults();
            },
            error: function(error) {
                console.error('Error fetching search results:', error);
            }
        });
    }

    // Function to display search results
    function displaySearchResults() {
        var moviesGrid = $('#moviesGrid');
        moviesGrid.empty(); // Clear previous content

        searchResults.forEach(function(movie) {
            var posterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            var poster = $('<img>').attr('src', posterUrl).addClass('movie-poster');
            poster.click(function() {
                window.location.href = '/movie/' + movie.id; // Navigate to movie details page
            });
            moviesGrid.append(poster);
        });
    }

    // Event listener for search button click
    $('#searchButton').click(function() {
        var query = $('#searchInput').val();
        if (query.trim() !== '') {
            searchMovies(query);
        }
    });

    // Fetch popular movies when the page loads
    fetchPopularMovies();
});
