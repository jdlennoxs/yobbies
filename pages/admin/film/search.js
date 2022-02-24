import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import MovieCard from "../../../components/movie-card";
import { useMovieDbSearch } from "../../../helpers/use-movie-db-search";

import Link from "next/link";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState();

  const search = (event) => {
    console.log(event);
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    setSearchTerm(event.target.search.value);
  };

  const { films, isLoading, isError } = useMovieDbSearch(searchTerm);

  //   if (loading || isLoading) return "Loading...";
  if (isError) return `Error! ${error.message}`;
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">Film club</h1>
      </div>
      <div className="content">
        <h2 className="has-text-white">Add film</h2>
      </div>
      <form onSubmit={search}>
        <div class="field">
          <label class="label" htmlFor="Search films">
            Search films
          </label>
          <input
            class="input"
            id="search"
            name="search"
            type="text"
            autoComplete="search"
            required
          />
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" type="submit">
              Search
            </button>
          </div>
          <div class="control">
            <button
              class="button is-link is-light is-danger"
              onClick={() => setSearchTerm()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      <div className="columns is-multiline is-mobile">
        {films &&
          !isLoading &&
          films.results.map((film) => (
            <Link
              href={{
                pathname: `/admin/film/add`,
                query: { id: film.id },
              }}
            >
              <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                <MovieCard path={film.poster_path} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
