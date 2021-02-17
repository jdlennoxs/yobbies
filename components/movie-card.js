import React from "react";

export const getPath = (path) => {
  if (path && path.charAt(0) === "/") {
    return `https://image.tmdb.org/t/p/w342/${path}`;
  }
  return path;
}

export default function MovieCard({ path }) {
  return <img className="poster" src={getPath(path)} />;
}
