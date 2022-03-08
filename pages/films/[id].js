import Head from "next/head";
import React, { useState } from "react";
import ActorCard from "../../components/actor-card";
import Detail from "../../components/detail";
import MovieCard, { getPath } from "../../components/movie-card";
import { query } from "../../helpers/static-props-query";

export default function MoviePage({ film }) {
  const topCast = film.actorActedIn.slice(0, 10);
  const [showCast, setShowCast] = useState(topCast);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={film.overview.replace(/&amp;/g, "&")}
        />
        <meta property="og:title" content={film.title} key="ogtitle" />
        <meta
          property="og:description"
          content={film.overview.replace(/&amp;/g, "&")}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={getPath(film.poster_path)}
          key="ogimage"
        />
        <title>{film.title}</title>
      </Head>
      <div className="my-6 py-6 mx-3">
        <div className="narrow-container">
          <div className="hero">
            <div className="columns">
              <div className="column is-narrow">
                <MovieCard path={film.poster_path} />
              </div>

              <div className="column">
                <div className="block">
                  <div className="content">
                    <h1 className="title is-1 has-text-white">{film.title}</h1>
                    <h1 className="subtitle is-3 has-text-primary">
                      ({new Date(film.release_date).getFullYear()})
                    </h1>
                  </div>
                  <div className="block content is-medium">
                    <p className="has-text-white subtitle is-3">
                      {film.tagline}
                    </p>
                    <p className="has-text-white">
                      {film.overview.replace(/&amp;/g, "&")}
                    </p>
                    <p className="title is-3 has-text-primary">
                      {10 * film.vote_average}%
                    </p>
                    <p className="subtitle is-5 has-text-white">
                      Viewer Rating
                    </p>
                  </div>

                  <Detail
                    yob={film.chosenByYob}
                    runtime={film.runtime}
                    budget={film.budget}
                    revenue={film.revenue}
                    genres={film.hasGenreGenre}
                    countries={film.originCountry}
                    languages={film.featuresLanguage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 content">
            <h1 className="title is-1 has-text-white">Top billed cast</h1>

            <div className="columns is-multiline is-mobile">
              <>
                {showCast.map((actor) => (
                  <div className="column is-one-fifth-tablet is-half-mobile">
                    <ActorCard
                      name={actor.name}
                      subtitle={actor.actedInFilmConnection.edges[0].roles}
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
                onClick={() => setShowCast(film.actorActedIn)}
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

          <div className="py-6 content">
            <h1 className="title is-1 has-text-white">Directed by</h1>
            <div className="column is-one-fifth-tablet is-half-mobile">
              <ActorCard
                name={film.directorDirected.name}
                image={film.directorDirected.profile_path}
                type="actor"
              />
            </div>
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
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { films } = await query(`
    { films ( 
      where: {slug: "${context.params.id}"}
      ) {
          title
          slug
          poster_path
          release_date
          tagline
          overview
          vote_average
          runtime
          budget
          revenue
          chosenByYob {
            name
            id
          }
          actorActedIn (
            options: {
              sort: [{
                popularity: DESC
              }]
            }
          ) {
            name
            profile_path
            actedInFilmConnection {
              edges {
                roles
              }
            }
          }
          directorDirected {
            name
            profile_path
          }
          hasGenreGenre {
            name
          }
          featuresLanguage { 
            name
          }
          originCountry {
            name
          }
        }
    }
  `);
  return {
    props: {
      film: films[0],
    },
  };
}
