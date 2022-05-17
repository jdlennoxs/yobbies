import { useState } from "react";
import MovieCard from "../../components/movie-card";
import { useMovieDbSearch } from "../../helpers/use-movie-db-search";

export default function SearchFilm({ setActiveId }) {
  const [searchTerm, setSearchTerm] = useState();

  const search = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    setSearchTerm(event.target.search.value);
  };

  const { films, isLoading, isError } = useMovieDbSearch(searchTerm);
  if (isError) return `Error! ${error.message}`;
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">Film club</h1>
      </div>
      <div className="content">
        <h2 className="has-text-white">Find a film</h2>
      </div>
      <form onSubmit={search}>
        <div className="field">
          <label className="label" htmlFor="Search films">
            Search films
          </label>
          <input
            className="input"
            id="search"
            name="search"
            type="text"
            autoComplete="search"
            required
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Search
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light is-danger"
              onClick={() => setSearchTerm()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      <div className="py-4 columns is-multiline is-mobile">
        {films &&
          !isLoading &&
          films.results.map((film) => (
            <div className=" my-4 column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
              <MovieCard path={film.poster_path} />
              <button
                className="my-2 button is-light is-success"
                onClick={() => setActiveId(film.id)}
              >
                {film.title}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
