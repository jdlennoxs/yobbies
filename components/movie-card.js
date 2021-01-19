import React from "react";

export default function MovieCard({ path }) {
  
  const src = (path) => {
  if (path && path.charAt(0) === "/") {
    return `https://image.tmdb.org/t/p/w342/${path}`
  }
  return path
}

  return (
    <img
      class="poster"
      src={src(path)}
    />
  );
}
