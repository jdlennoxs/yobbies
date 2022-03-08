import Link from "next/link";
import { query } from "../helpers/static-props-query";
import MovieCard from "../components/movie-card";
import ActorCard from "../components/actor-card";

export default function Awards({ awards }) {
  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">The Awards</h1>
      </div>
      <div className="tabs">
        <ul>
          <li className="is-active">
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
              <h2 className="is-size-4 has-text-white">{award.name}</h2>
              <p>{award.description}</p>
            </div>
            {award.type === "film" ? (
              <div className="columns is-multiline is-mobile">
                {award.filmNominatedForConnection.edges.map((film) => (
                  <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                    <Link href={`/films/${film.node.slug}`}>
                      <a className="poster-link">
                        <ActorCard
                          unfix
                          name={film.detail}
                          image={film.node.poster_path}
                          type="film"
                          winner={
                            film.node.slug ===
                              award.filmWinnerOfConnection.edges[0].node.slug &&
                            film.detail ===
                              award.filmWinnerOfConnection.edges[0].detail
                          }
                        />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="columns is-multiline is-mobile">
                {award.yobNominatedForConnection.edges.map((yob) => (
                  <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                    <Link href={`/yobs/${yob.node.id}`}>
                      <a className="poster-link">
                        <ActorCard
                          name={yob.node.name}
                          subtitle={yob.detail}
                          showSubtitle
                          type="actor"
                          winner={
                            yob.node.id ===
                              award.yobWinnerOfConnection.edges[0].node.id &&
                            yob.detail ===
                              award.yobWinnerOfConnection.edges[0].detail
                          }
                        />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
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

export async function getServerSideProps() {
  const { awards } = await query(`
    { awards
        {
            name
            description
            type
            id
            yobNominatedForConnection {
              edges {
                season
                detail
                node {
                  name
                  id
                }
              }
            }
            filmNominatedForConnection {
              edges {
                season
                detail
                node {
                  poster_path
                  slug
                }
              }
            }
            filmWinnerOfConnection {
              edges {
                detail
                node {
                  slug
                }
              }
            }
            yobWinnerOfConnection {
              edges {
                detail
                node {
                  id
                }
              }
            }
        } 
    }
`);
  return {
    props: { awards },
  };
  // will be passed to the page component as props
}
