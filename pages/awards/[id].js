import fs from "fs";
import path from "path";
import ActorCard from "../../components/actor-card";
import MovieCard from "../../components/movie-card";
import moviesdata from "../../data/movies.json";
import actorsdata from "../../data/actors.json"
import yobsdata from "../../data/yobs.json"

const POSTS_PATH = path.join(process.cwd(), "data/awards");

export default function AwardsPage({ award, movies, actors, yobs }) {
  return (

    <div className="container p-3 my-6 ">
      <div className="py-6 content">
        <h1 className="title is-1 has-text-white">{award.name}</h1>
        <p className="subtitle is-3">{award.description}</p>
        <div className="py-6 content">
          <h2 className="title is-3 has-text-white">Nominees</h2>
          <div className="columns is-multiline is-mobile">
            <>
              {award.nominees.map((nominee) => {
                if (award.type === "film") {
                  const film = movies[nominee]

                  return (<div className="column is-one-fifth-tablet is-half-mobile">
                    <ActorCard unfix type={award.type} title={film.details.title} image={film.details.poster_path} />
                  </div>
                  )
                }
                if (award.type === "actor") {
                  const actor = actors[nominee.name]
                  const film = movies[nominee.film]

                  return (<div className="column is-one-fifth-tablet is-half-mobile">
                    <ActorCard type={award.type} name={actor.name} subtitle={film.details.title} image={actor.profile_path} showSubtitle />
                  </div>
                  )
                }
                if (award.type === "yob") {
                  const yob = yobs[nominee]

                  return (<div className="column is-one-fifth-tablet is-half-mobile">
                    <ActorCard type={award.type} name={yob.name} image={yob.image || ""} />
                  </div>
                  )
                }
              }
              )}
            </>
          </div>
        </div>
      </div>
    </div>)
}

export async function getStaticPaths() {
  const fullPaths = fs.readdirSync(POSTS_PATH);
  const paths = fullPaths // Remove file extensions for page paths
    .map((path) => path.replace(/\.json?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { id: slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const movies = moviesdata;
  const actors = actorsdata;
  const yobs = yobsdata;
  const fullPath = path.join(POSTS_PATH, `${context.params.id}.json`);
  const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  return {
    props: {
      award: fileContents,
      movies,
      actors,
      yobs
    },
  };
}
