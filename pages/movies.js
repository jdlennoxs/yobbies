import Link from "next/link";
import MovieCard from "../components/movie-card";
import metadata from "../data/metadata.json";
import moviesdata from "../data/movies.json";

export default function Movies({ movies }) {
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">The Movies</h1>
      </div>
      <div className="columns is-multiline is-mobile">
        {movies.reverse().map((movie) => (
          <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
            <Link href={`/movies/${movie.slug}`}>
              <a className="poster-link">
                <MovieCard path={movie.details.poster_path} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let movies = [];
  for (const movie of metadata) {
    movies.push({ ...movie, details: moviesdata[movie.slug].details });
  }

  return {
    props: {
      movies,
    },
  };
  // will be passed to the page component as props
}
