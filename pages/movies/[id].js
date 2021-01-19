import React, { useState } from "react";
import Detail from "../../components/detail";
import MovieCard from "../../components/movie-card";
import ActorCard from "../../components/actor-card";
import moviesdata from "../../data/movies.json";

export default function MoviePage({ details, director, cast }) {
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

  const topCast = cast.slice(0, 10);
  const [showCast, setShowCast] = useState(topCast);

  return (
    <div class="my-6 py-6 mx-3">
      <div class="narrow-container">
        <div class="hero">
          <div class="columns">
            <div class="column is-narrow">
              <MovieCard path={details.poster_path} />
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
                  <p class="has-text-white">
                    {details.overview.replace(/&amp;/g, "&")}
                  </p>
                  <p class="title is-3 has-text-primary">
                    {10 * details.vote_average}%
                  </p>
                  <p class="subtitle is-5 has-text-white">Viewer Rating</p>
                </div>

                <Detail director={director} details={details} />
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 content">
          <h1 class="title is-1 has-text-white">Top billed cast</h1>

          <div class="columns is-multiline is-mobile">
            <>
              {showCast.map((actor) => (
                <div class="column is-one-fifth-tablet is-half-mobile">
                  <ActorCard actor={actor} showCharacter />
                </div>
              ))}
            </>
            {/* <MovieCard path={c.profile_path}/>))} */}
          </div>
          {showCast.length === 10 ? (
            <button
              className="button is-black"
              onClick={() => setShowCast(cast)}
            >
              Show All
            </button>
          ) : (
            <button
              className="button is-black"
              onClick={() => setShowCast(topCast)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(moviesdata).map((slug) => ({
    params: { id: slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const movie = moviesdata[context.params.id];
  return {
    props: {
      details: movie.details,
      director: movie.director,
      cast: movie.cast,
    },
  };
}
