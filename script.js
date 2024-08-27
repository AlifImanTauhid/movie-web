const btnSearch = document.querySelector('.search-btn');
// search button handler
btnSearch.addEventListener("click", async function () {
    try {
        const input = document.querySelector('input');
        const keywords = input.value;
        const movies = await hitMovieAPI(keywords);
        moviePopulated(movies);
    } catch (err) {
        alert(err)
    }
})

async function hitMovieAPI(inputValue) {
    const endpoint = `http://www.omdbapi.com/?apikey=40f46a&s=` + inputValue;
    // fetch API
    const response = await fetch(endpoint);
    // error handling
    if (!response.ok) throw new Error(response.statusText);
    const response_result = await response.json();
    // error handling
    if (response_result.Response === "False") throw new Error(response_result.Error);
    return response_result.Search;
}

function moviePopulated(movies) {
    let cards = '';
    const movieContainer = document.querySelector('.movie-cards-container');
    movies.forEach(movie => cards += showMovie(movie));
    movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains('modal-movie-button')) {
        const movieImdbid = e.target.dataset.imdbid;
        const movieDetail = await hitMoiveDetailAPI(movieImdbid)
        movieDetailPopulated(movieDetail)
    };
});

async function hitMoiveDetailAPI(imdbid) {
    const infoEndpoint = `http://www.omdbapi.com/?apikey=40f46a&i=` + imdbid;
    const response = await fetch(infoEndpoint);
    const response_result = await response.json();
    return response_result;
}

function movieDetailPopulated(response) {
    const modalBody = document.querySelector('.modal-body');
    const movieDetail = showMovieDetail(response);
    modalBody.innerHTML = movieDetail;
}

function showMovie(movie) {
    return `<div class="col-md-3 my-3">
							<div class="card">
							<img src="${movie.Poster}" class="card-img-top" alt="Poster" />
							<div class="card-body">
								<h5 class="card-title">${movie.Title}</h5>
								<h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
								<a href="#" class="btn btn-primary modal-movie-button" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${movie.imdbID}">Details</a>
							</div>
						</div>
					</div>`
}

function showMovieDetail(dataDetails) {
    return `<div class="container-fluid">
							<div class="row">
								<div class="col-md-3">
									<img src="${dataDetails.Poster}" alt="Posters" class="img-fluid" />
								</div>
								<div class="col-md">
									<ul class="list-group">
										<li class="list-group-item"><strong>${dataDetails.Title}</strong>, ${dataDetails.Year}</li>
										<li class="list-group-item">
											${dataDetails.Director}
										</li>
										<li class="list-group-item">
											${dataDetails.Writer}
										</li>
										<li class="list-group-item">
											${dataDetails.Actors}
										</li>
										<li class="list-group-item">
											${dataDetails.Plot}
										</li>
									</ul>
								</div>
							</div>
						</div>`
}