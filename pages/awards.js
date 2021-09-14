import Link from "next/link";
import fs from "fs";
import path from "path";
import moviesdata from "../data/movies.json";
import yobsdata from "../data/yobs.json";
import actorsdata from "../data/actors.json";

const POSTS_PATH = path.join(process.cwd(), "data/awards");

export default function Awards({ awards, movies, yobs, actors }) {
  const lookupFilm = (id) => movies[id].details.title;
  const lookupActor = (id) => actors[id].name;
  const lookupYobs = (id) => yobs[id].name;
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">The Awards</h1>
      </div>
      <div class="tabs">
        <ul>
          <li class="is-active">
            <a>Season 1</a>
          </li>
          <li>
            <a>Season 2</a>
          </li>
        </ul>
      </div>
      <ul>
        {awards.map((award) => (
          <li>
            <div className="block">
              <Link href={`/awards/${award.slug}`}>
                <a className="poster-link">
                  <>
                    <h2 className="is-size-4 has-text-white">{award.name}</h2>
                    <p>{award.description}</p>
                  </>
                </a>
              </Link>
            </div>
            <div className="table-container">
              <table className="table is-narrow has-background-dark">
                <tr>
                  <td>
                    <div style={{ flexWrap: "wrap" }} className="is-flex">
                      {award.type === "film" && award.nominees ? (
                        <>
                          {award.nominees.map((n) => (
                            <div className="info-tag">{lookupFilm(n)}</div>
                          ))}
                        </>
                      ) : null}
                      {award.type === "actor" && award.nominees ? (
                        <>
                          {award.nominees.map((n) => (
                            <div className="info-tag">{n}</div> //{lookupActor(n.name)}</div>
                          ))}
                        </>
                      ) : null}
                      {award.type === "yob" && award.nominees ? (
                        <>
                          {award.nominees.map((n) => (
                            <div className="info-tag">{lookupYobs(n)}</div>
                          ))}
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const movies = moviesdata;
  const yobs = yobsdata;
  const actors = actorsdata;
  const fullPaths = fs.readdirSync(POSTS_PATH);
  const paths = fullPaths // Remove file extensions for page paths
    .map((path) => path.replace(/\.json?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ id: slug }));

  const awards = paths.map((p) => {
    const fullPath = path.join(POSTS_PATH, `${p.id}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    return {
      name: fileContents.name,
      description: fileContents.description,
      nominees: fileContents.nominees,
      type: fileContents.type,
      slug: p.id,
    };
  });
  return {
    props: {
      awards,
      movies,
      actors,
      yobs,
    },
  };
  // will be passed to the page component as props
}
