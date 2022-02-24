const api_key = "1b18bf813f2054204db80c783520c4c6";
import fetch from "node-fetch";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    console.log(response);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export function useMovieDbSearch(query) {
  const { data, error } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          query
        )}`
      : null,
    fetcher
  );

  return {
    films: data,
    isLoading: !error && !data,
    isError: error,
  };
}
