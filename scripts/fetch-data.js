const fetch = require("node-fetch");
const fs = require("fs");
const api_key = "1b18bf813f2054204db80c783520c4c6";

const metadata = require("../data/metadata.json");

const fetchMovieDetails = async () => {
  let movies = {};
  let actors = {};
  for (const movie of metadata) {
    const detail = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}`
    );
    const credit = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`
    );
    const details = await detail.json();
    const credits = await credit.json();
    const slug = details.title
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")
      .toLowerCase();
    const director = credits.crew.find((member) => member.job === "Director");
    if (movie.id === "38001") {
      details.poster_path =
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRWZr5hDpYDdOzga5aAcFAo5vuN67QliJ1UzrkryQwGqVx1CSMX";
    }
    movies[slug] = {
      ...movie,
      slug,
      details,
      cast: credits.cast,
      director: director,
      chosen_by: movie.chosen_by,
    };
    credits.cast.forEach(
      ({
        gender,
        id,
        known_for_department,
        name,
        popularity,
        profile_path,
      }) => {
        const actorSlug = name
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-_]/g, "")
          .toLowerCase();
        if (actors[actorSlug] === undefined) {
          actors[actorSlug] = {
            gender,
            id,
            known_for_department,
            name,
            popularity,
            profile_path,
            movies: [movie.slug],
          };
        } else {
          actors[actorSlug].movies.push(movie.slug);
        }
      }
    );
  }

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  fs.writeFile("./data/actors.json", JSON.stringify(actors), (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};

fetchMovieDetails();
