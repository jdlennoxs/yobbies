import Link from "next/link";
import MovieCard from "../components/movie-card";
import metadata from "../data/metadata.json";
import moviesdata from "../data/movies.json";

export default function Movies({ movies }) {
  return (
    <div class="narrow-container p-6 my-6 ">
      <div class="content">
        <h1 class="has-text-white">The Movies</h1>
      </div>
      <div class="columns is-multiline">
        {movies.map((movie) => (
          <div class="column is-one-fifth-desktop is-one-third-tablet">
            <Link href={`/movies/${movie.slug}`}>
              <a class="poster-link">
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
