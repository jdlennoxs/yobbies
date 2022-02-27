import React, { useState } from "react";
import Head from "next/head";
import Detail from "../../components/detail";
import MovieCard, { getPath } from "../../components/movie-card";
import ActorCard from "../../components/actor-card";
import moviesdata from "../../data/movies.json";
import yobsdata from "../../data/yobs.json";
import { query } from "../../helpers/static-props-query";

export default function MoviePage({ details, director, cast, yob }) {
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={details.overview.replace(/&amp;/g, "&")}
        />
        <meta property="og:title" content={details.title} key="ogtitle" />
        <meta
          property="og:description"
          content={details.overview.replace(/&amp;/g, "&")}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={getPath(details.poster_path)}
          key="ogimage"
        />
        <title>{details.title}</title>
      </Head>
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
                    <p class="has-text-white subtitle is-3">
                      {details.tagline}
                    </p>
                    <p class="has-text-white">
                      {details.overview.replace(/&amp;/g, "&")}
                    </p>
                    <p class="title is-3 has-text-primary">
                      {10 * details.vote_average}%
                    </p>
                    <p class="subtitle is-5 has-text-white">Viewer Rating</p>
                  </div>

                  <Detail director={director} details={details} yob={yob} />
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
                    <ActorCard
                      name={actor.name}
                      subtitle={actor.character}
                      image={actor.profile_path}
                      type="actor"
                      showSubtitle
                    />
                  </div>
                ))}
              </>
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
    </>
  );
}

export async function getStaticPaths() {
  const { films } = await query(`
  { films
      {
          slug
      } 
  }
`);
  const paths = films.map((film) => ({
    params: { id: film.slug },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { films } = await query(`
  { films
      {
          where: {slug: ${context.params.id}}
      } 
  }
`);
  const yobs = yobsdata;
  return {
    props: {
      details: movie.details,
      director: movie.director,
      cast: movie.cast,
      yob: yobs[movie.chosen_by],
    },
  };
}
