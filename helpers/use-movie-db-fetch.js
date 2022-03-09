const api_key = "1b18bf813f2054204db80c783520c4c6";
import fetch from "node-fetch";
import useSWR from "swr";

function fetcher(...urls) {
  const f = (u) => fetch(u).then((r) => r.json());

  if (urls.length > 1) {
    return Promise.all(urls.map(f));
  }
  return f(urls);
}

export function useMovieDbFetch(id) {
  const { data, error } = useSWR(
    id
      ? [
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`,
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`,
        ]
      : null,
    fetcher
  );

  return {
    film: data,
    details: data ? data[0] : undefined,
    cast: data ? data[1].cast : undefined,
    director: data
      ? data[1].crew.find((member) => member.job === "Director")
      : undefined,
    isLoading: !error && !data,
    isError: error,
  };
}
