const form = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const genreSelect = document.getElementById("movie-genre");
const message = document.getElementById("form-message");
const movieList = document.getElementById("movie-list");
const emptyMessage = document.getElementById("empty-message");

const watchlist = {
  movies:[{ title: "The Princess Bride", genre: "Adventure", watched: false }],
  toggleWatched(index) {
    this.movies[index].watched = !this.movies[index].watched;

  },
  removeMovie(index) {
    this.movies.splice(index, 1);
  }
};


function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(watchlist.movies));
}

function loadMovies() {
  saved = localStorage.getItem("movies")
  if (saved = null) {
  return
  } 

  try {
    JSON.parse(saved) = watchlist.movies
  } catch {
  
  }

}

function renderMovies() {
  movieList.replaceChildren();

  watchlist.movies.forEach((movie, index) => {
    const card = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = movie.title;

    const details = document.createElement("p");
    details.textContent = movie.genre + " | "
    details.textContent += movie.watched ? "Watched" : "Not Watched"
    console.log(details.textContent)

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";

      toggleButton.textContent = movie.watched ? "Mark Watched" : "Unwatched"

    toggleButton.addEventListener("click", () => {
      watchlist.toggleWatched(index);
      saveMovies();
      renderMovies();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      watchlist.removeMovie(index);
      saveMovies();
      renderMovies();
    });

    card.append(title, details, toggleButton, removeButton);
    movieList.append(card);
  });
  if (watchlist.movies.length = 0) {
    message.textContent = "Your watchlist is empty. Add a movie to get started"
  } else {
    message.textContent = ""
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const titleInpit0 = titleInput.value
  const titleInp = titleInpit0.trim()
  const genreSel = genreSelect.value

  if (titleInp == "") {
    return emptyMessage.textContent = "Enter a movie title"
  }
   else if (genreSel == "") {
    return emptyMessage.textContent = "Choose a genre"
    
  } else {
    watchlist.movies.push({title: `${titleInp}`, genre: `${genreSel}`, watched:`false`})
    renderMovies()
    saveMovies()
  }
});

loadMovies();
renderMovies();