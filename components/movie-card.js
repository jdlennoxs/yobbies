import React from "react";

export default function MovieCard({ movie }) {
  return (
    // <div class="poster">
    <img
      class="poster"
      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
    />
  );
}
