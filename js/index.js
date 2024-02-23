function onClick() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  modal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var movieName = document.getElementById("search").value;
      const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
        movieName
      )}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE2YTY3OGYxMzZmNzU2YTVlOTI5ZjU2YWRhNzFiNCIsInN1YiI6IjY1ZDgwNTIxOTQ0YTU3MDE2MzIzYTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nen7Oln3vKJzKnc5LjdWZ4_TzxO-YseDiOwLRASDkC8",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          if (json.results && json.results.length > 0) {
            const moviedetails = json.results[0];
            document.getElementById("movieName").textContent =
              moviedetails.title;
            document.getElementById("movieOverview").textContent =
              moviedetails.overview;
          } else {
            alert("No movie found");
          }
        })
        .catch((err) => console.error("error:" + err));
    }
  });
  window.onclick = function (event) {
    var eraseMoviename = document.getElementById("movieName");
    var eraseMovieOverview = document.getElementById("movieOverview");
    if (event.target == modal) {
      modal.style.display = "none";
      eraseMoviename.textContent = "";
      eraseMovieOverview.textContent = "";
    }
  };
}

function onClose() {
  var eraseMoviename = document.getElementById("movieName");
  var eraseMovieOverview = document.getElementById("movieOverview");
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  eraseMoviename.textContent = "";
  eraseMovieOverview.textContent = "";
}

function displayMovie() {}
