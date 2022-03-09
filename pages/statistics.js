import Link from "next/link";
import ActorCard from "../components/actor-card";
import Geo from "../components/geo";
import Scatter from "../components/scatter";
import StatCard from "../components/stat-card";
import { getFilmsByYear, getFilmsPerCountry } from "../helpers/data-helpers";
import { query } from "../helpers/static-props-query";

export default function Statistics({ statistics }) {
  return (
    <div className="container p-3 my-6 ">
      <div className="content block">
        <h1 className="has-text-white">The Statistics</h1>
      </div>

      <div className="columns is-multiline block">
        <div className="column is-one-third-tablet">
          <StatCard
            title="Number of films"
            value={statistics.filmsAggregate.count}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Number of languages"
            value={statistics.languagesAggregate.count}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Number of genres"
            value={statistics.genresAggregate.count}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Female directors"
            value={statistics.directorsAggregate.count}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Average budget"
            value={`${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 3,
            }).format(statistics.filmsAggregate.budget.average / 1000000)}m`}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Average revenue"
            value={`${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 3,
            }).format(statistics.filmsAggregate.revenue.average / 1000000)}m`}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Total actors"
            value={statistics.actorsAggregate.count}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Average rating"
            value={`${(
              10 * statistics.filmsAggregate.vote_average.average
            ).toFixed(0)}%`}
          />
        </div>
        <div className="column is-one-third-tablet">
          <StatCard
            title="Oldest release"
            value={new Date(
              statistics.filmsAggregate.release_date.min
            ).getFullYear()}
          />
        </div>
      </div>

      <div className="content block">
        <h3 className="has-text-white">Selection by Release Year</h3>
        <Scatter data={getFilmsByYear({ history: statistics.yobs })} />

        <h3 className="has-text-white">Pictures by Country</h3>
        <Geo data={getFilmsPerCountry({ countries: statistics.countries })} />

        <h3 className="pt-6 has-text-white">Film Links</h3>
        <div className="columns is-multiline is-mobile">
          <>
            {statistics.actors.map((actor) => (
              <div className="column is-one-fifth-tablet is-half-mobile">
                <ActorCard
                  name={actor.name}
                  subtitle={actor.actedInFilm
                    .map((film) => film.title)
                    .join(", ")}
                  image={actor.profile_path}
                  type="actor"
                  showSubtitle
                />
              </div>
            ))}
          </>
        </div>
        <h3 className="pt-6 has-text-white">Top Rated Films</h3>
        <div className="columns is-multiline is-mobile">
          {statistics.films.map((film) => (
            <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
              <Link href={`/films/${film.slug}`}>
                <a className="poster-link">
                  <ActorCard
                    type="film"
                    name={`${(10 * film.vote_average).toFixed(0)}%`}
                    image={film.poster_path}
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const statistics = await query(`
    { 
        filmsAggregate {
            count
            release_date {
                min
            }
            revenue {
                average
            }
            budget {
                  average
            }
            vote_average {
                average
            }
        } 
        languagesAggregate {
            count
        } 
        genresAggregate {
            count
        } 
        actorsAggregate {
            count
        } 
        directorsAggregate (
            where: {gender: 1}
        ) {
            count
        }
        actors (
            where: {
                actedInFilmAggregate: {
                    count_GT: 1
                }
            }
        ) {
            name
            profile_path
            actedInFilm {
                title
            }
        }
        films (
            options: {
                sort: [
                  {
                    vote_average: DESC
                  }
                ],
                limit: 10
              }
        ) {
            slug
            poster_path
            vote_average
        }
        countries {
            filmOriginAggregate {
              count
            }
            iso
          }
          yobs {
            filmChosenBy {
              slug
              order
              runtime
              title
              release_date
            }
            name
            id
          }
    }
`);
  return {
    props: {
      statistics,
    },
  };
  // will be passed to the page component as props
}
