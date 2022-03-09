import { query } from "../../helpers/static-props-query";
import Link from "next/link";
import MovieCard from "../../components/movie-card";
import StatCard from "../../components/stat-card";
import { flatten, groupBy } from "lodash";

export default function Yobs({ yob, nominations, wins, awards, runtime }) {
  return (
    <div className="my-6 py-6 mx-3">
      <div className="narrow-container">
        <div className="hero">
          <div className="columns">
            <div className="column">
              <div className="block">
                <div className="content">
                  <h1 className="title is-1 has-text-white">{yob.name}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline block">
            <div className="column is-one-third-tablet">
              <StatCard title="Average Runtime" value={`${runtime} minutes`} />
            </div>
            <div className="column is-one-third-tablet">
              <StatCard title="Nominations" value={nominations} />
            </div>
            <div className="column is-one-third-tablet">
              <StatCard title="Wins" value={wins} />
            </div>
          </div>
          <div className="content">
            <h2 className="has-text-white">Films</h2>
          </div>
          <div className="columns is-multiline is-mobile">
            {yob.filmChosenBy.map((film) => (
              <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                <Link href={`/films/${film.slug}`}>
                  <a className="poster-link">
                    <MovieCard path={film.poster_path} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
          {wins > 0 && (
            <>
              <div className="content">
                <h2 className="has-text-white">Winner</h2>
              </div>
              <ul>
                {awards["1"].map((award) => (
                  <li className="gradient-text">
                    <h3 className="is-size-3">{award.name}</h3>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSidePaths() {
  const { yobs } = await query(`
    { yobs
        {
            id
        } 
    }
  `);
  const paths = yobs.map((yob) => ({
    params: { id: yob.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps(context) {
  const { yobs } = await query(`
      { yobs
            (
                where: {id: ${context.params.id}}
            )
          {
              name
              nominatedForAwardConnection {
                totalCount
              }
              winnerOfAwardConnection {
                totalCount
                edges {
                  season
                  node {
                    name
                  }
                }
              }
              filmChosenBy {
                slug
                poster_path
                runtime
                nominatedForAwardConnection {
                  totalCount
                }
                winnerOfAwardConnection {
                  totalCount
                  edges {
                    season
                    node {
                      name
                    }
                  }
                }
              }
          }
      }
  `);
  const yob = yobs[0];
  const filmNominations = yob.filmChosenBy.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.nominatedForAwardConnection.totalCount,
    0
  );
  const nominations =
    yob.nominatedForAwardConnection.totalCount + filmNominations;
  const filmWins = yob.filmChosenBy.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.winnerOfAwardConnection.totalCount,
    0
  );
  const wins = yob.winnerOfAwardConnection.totalCount + filmWins;
  const awardsWon = yob.winnerOfAwardConnection.edges.map((award) => ({
    season: award.season,
    name: award.node.name,
  }));
  const filmAwardsWon = yob.filmChosenBy.map((film) =>
    film.winnerOfAwardConnection.edges.map((award) => ({
      season: award.season,
      name: award.node.name,
    }))
  );
  const awards = awardsWon.concat(flatten(filmAwardsWon));
  const runtime = yob.filmChosenBy.reduce(
    (previousValue, currentValue) => previousValue + currentValue.runtime,
    0
  );

  return {
    props: {
      yob,
      nominations,
      wins,
      awards: groupBy(awards, "season"),
      runtime: Math.round(runtime / yob.filmChosenBy.length),
    },
  };
}
