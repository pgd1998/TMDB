function onClick() {
  var search = document.getElementById("search");

  search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var movieName = search.value;
      const url = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
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
            const fetchPromises = json.results.map((result) => {
              const providerUrl = `https://api.themoviedb.org/3/${result.media_type}/${result.id}/watch/providers`;
              return fetch(providerUrl, options)
                .then((res) => res.json())
                .then((providerData) => {
                  const countryProviders = providerData.results || {};
                  const providers = Object.keys(countryProviders).reduce(
                    (acc, country) => {
                      const countryProvider = countryProviders[country];
                      if (countryProvider.flatrate) {
                        const providerNames = countryProvider.flatrate.map(
                          (provider) => provider.provider_name
                        );
                        acc[country] = providerNames;
                      }
                      return acc;
                    },
                    {}
                  );
                  // Store provider details in the result object
                  return {
                    ...result,
                    title: result.title ? result.title : result.name,
                    poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
                    id: result.id,
                    providers: providers,
                  };
                });
            });
            Promise.all(fetchPromises)
              .then((moviedetails) => {
                localStorage.setItem(
                  "moviedetails",
                  JSON.stringify(moviedetails)
                );
                window.location.href = "src/html/movieDetails.html";
              })
              .catch((err) => console.error("error:" + err));
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

function back() {
  window.location.href = "../../index.html";
}

function onClose() {
  // var eraseMoviename = document.getElementById("movieName");
  // var eraseMovieOverview = document.getElementById("movieOverview");
  // var modal = document.getElementById("myModal");
  // modal.style.display = "none";
  // eraseMoviename.textContent = "";
  // eraseMovieOverview.textContent = "";
}


