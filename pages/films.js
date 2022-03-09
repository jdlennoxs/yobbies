import { groupBy } from "lodash";
import Link from "next/link";
import MovieCard from "../components/movie-card";
import { query } from "../helpers/static-props-query";

export default function Movies({ films }) {
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">The Films</h1>
      </div>
      {Object.keys(films).map((season) => (
        <>
          <div className="content">
            <h2 className="has-text-white">{season}</h2>
          </div>
          <div className="columns is-multiline is-mobile">
            {films[season].map((film) => (
              <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                <Link href={`/films/${film.slug}`}>
                  <a className="poster-link">
                    <MovieCard path={film.poster_path} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { films } = await query(`
      { films
          {
              poster_path 
              slug
              watchedInSeason {
                name
                id
              }
          } 
      }
  `);
  return {
    props: { films: groupBy(films.reverse(), "watchedInSeason.name") },
  };
}
