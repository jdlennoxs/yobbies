const api_key = "1b18bf813f2054204db80c783520c4c6";
import fetch from "node-fetch";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export function useMovieDbFetch(id) {
  const { data, error } = useSWR(
    id ? `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}` : null,
    fetcher
  );

  return {
    film: data,
    isLoading: !error && !data,
    isError: error,
  };
}

//   const credit = await fetch(
//     `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`
//   );
