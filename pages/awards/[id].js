import fs from "fs";
import path from "path";
import ActorCard from "../../components/actor-card";
import MovieCard from "../../components/movie-card";
import moviesdata from "../../data/movies.json";

const POSTS_PATH = path.join(process.cwd(), "data/awards");

export default function AwardsPage({ award, movies }) {
  return (

    <div className="narrow-container p-6 my-6 ">
      <div class="py-6 content">
        <h1 class="title is-1 has-text-white">{award.name}</h1>
        <p class="subtitle is-3">{award.description}</p>
        <div class="py-6 content">
          <h2 class="title is-3 has-text-white">Nominees</h2>
          <div class="columns is-multiline is-mobile">
            <>
              {award.nominees.map((nom) => {
                let nomDetail
                if (award.type === "film") {
                  nomDetail = movies[nom].details

                  return (<div class="column is-one-fifth-tablet is-half-mobile">
                    <ActorCard type={award.type} image={nomDetail.poster_path} />
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
  const fullPath = path.join(POSTS_PATH, `${context.params.id}.json`);
  const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  return {
    props: {
      award: fileContents,
      movies
    },
  };
}
