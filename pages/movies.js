import Link from "next/link";
import MovieCard from "../components/movie-card";
import MovieIds from "../data/movies.json";

export default function Movies({ movies }) {
  return (
    <div class="narrow-container p-6 my-6 ">
      <div class="content">
        <h1 class="has-text-white">The Movies</h1>
      </div>
      <div class="columns is-multiline">
        {movies.map((movie) => (
          <div class="column is-one-fifth-desktop is-one-third-tablet">
            <Link href={`/movies/${movie.id}`}>
              <a class="poster-link">
                <MovieCard movie={movie.detail} />
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
  for (const movie of MovieIds) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=1b18bf813f2054204db80c783520c4c6`
    );
    const detail = await res.json();
    movies.push({ ...movie, detail });
  }

  return {
    props: {
      movies,
    },
  };
  // will be passed to the page component as props
}
