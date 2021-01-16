import MovieCard from "../../components/movie-card";
import MovieData from "../../data/movies.json";

export default function MoviePage({ details }) {
  //   const detailsMap = {
  //     budget,
  //     genres,
  //     title,
  //     overview,
  //     poster_path,
  //     production_companies,
  //     production_countries,
  //     release_date,
  //     revenue,
  //     runtime,
  //     tagline,
  //     vote_average,
  //   };

  return (
    <div class="my-6 py-6 mx-3">
      <div class="narrow-container">
        <div class="hero">
          <div class="columns">
            <div class="column is-narrow">
              <MovieCard movie={details} />
            </div>

            <div class="column">
              <div class="block">
                <div class="content">
                  <h1 class="title is-1 has-text-white">{details.title}</h1>
                  <h1 class="subtitle is-3 has-text-primary">
                    ({new Date(details.release_date).getFullYear()})
                  </h1>
                </div>
                <div class="block content is-medium">
                  <p class="has-text-white subtitle is-3">{details.tagline}</p>
                  <p class="has-text-white">{details.overview}</p>
                  <p class="title is-3 has-text-primary">
                    {10 * details.vote_average}%
                  </p>
                  <p class="subtitle is-5 has-text-white">Viewer Rating</p>
                </div>
                <div class="block content is-small">
                  <p class="has-text-white">
                    Runtime: {details.runtime} minutes
                  </p>
                  <p class="has-text-white">
                    Country:{" "}
                    {details.production_countries.map((c) => `${c.name} `)}
                  </p>
                  <p class="has-text-white">
                    Produced By:{" "}
                    {details.production_companies.map((c) => `${c.name} `)}
                  </p>
                  {details.budget ? (
                    <p class="has-text-white">
                      Budget:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(details.budget)}
                    </p>
                  ) : null}
                  {details.revenue ? (
                    <p class="has-text-white">
                      Revenue:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(details.revenue)}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = MovieData.map((movie) => ({
    params: { id: movie.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=1b18bf813f2054204db80c783520c4c6`
  );
  const details = await res.json();

  return {
    props: {
      details,
    },
  };
}
