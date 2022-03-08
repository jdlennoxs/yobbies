import { gql, useMutation, useQuery } from "@apollo/client";
import MovieCard from "../../components/movie-card";
import countryCodes from "../../data/countryCodes.json";
import { useMovieDbFetch } from "../../helpers/use-movie-db-fetch";

const GET_ADD_DATA = gql`
  query Yobs {
    yobs {
      id
      name
    }
    seasons {
      id
      name
    }
    filmsAggregate {
      count
    }
  }
`;

const CREATE_FILM = gql`
  mutation CreateFilms($input: [FilmCreateInput!]!) {
    createFilms(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;
export default function AddFilm({ id, setActiveId }) {
  const { loading, error, data } = useQuery(GET_ADD_DATA);
  const { film, details, cast, director, isLoading, isError } =
    useMovieDbFetch(id);
  const [addFilm, { data: nodesCreated, loading: posting, error: failed }] =
    useMutation(CREATE_FILM);

  const save = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    const input = {
      id: String(details.id),
      slug: event.target.slug.value,
      title: details.title,
      order: parseInt(event.target.order.value),
      poster_path: details.poster_path,
      budget: details.budget,
      tagline: details.tagline,
      runtime: details.runtime,
      vote_average: details.vote_average,
      revenue: details.revenue,
      release_date: details.release_date,
      overview: details.overview,
      chosenByYob: {
        connect: {
          where: {
            node: { id: event.target.chosenBy.value },
          },
        },
      },
      watchedInSeason: {
        connect: {
          where: {
            node: { id: event.target.season.value },
          },
        },
      },
      hasGenreGenre: {
        connectOrCreate: details.genres.map((genre) => ({
          where: { node: { name: genre.name } },
          onCreate: { node: { name: genre.name } },
        })),
      },
      originCountry: {
        connectOrCreate: details.production_countries.map((country) => ({
          where: { node: { iso: countryCodes[country.iso_3166_1] } },
          onCreate: {
            node: { iso: countryCodes[country.iso_3166_1], name: country.name },
          },
        })),
      },
      featuresLanguage: {
        connectOrCreate: details.spoken_languages.map((language) => ({
          where: { node: { name: language.english_name } },
          onCreate: {
            node: { name: language.english_name },
          },
        })),
      },
      directorDirected: {
        connectOrCreate: {
          where: { node: { id: director.id } },
          onCreate: {
            node: {
              id: director.id,
              name: director.name,
              profile_path: director.profile_path,
              gender: director.gender,
              popularity: director.popularity,
            },
          },
        },
      },
      actorActedIn: {
        connectOrCreate: cast.map((actor) => ({
          where: { node: { id: actor.id } },
          onCreate: {
            node: {
              id: actor.id,
              name: actor.name,
              profile_path: actor.profile_path,
              gender: actor.gender,
              popularity: actor.popularity,
            },
            edge: {
              roles: [actor.character || "Unnamed"],
            },
          },
        })),
      },
    };

    addFilm({ variables: { input } });
  };

  return (
    <>
      {nodesCreated && (
        <div className="content">
          <h1 className="has-text-success">Success</h1>
        </div>
      )}
      {film && data && (
        <div className="container p-3 my-6 ">
          <div className="content">
            <h1 className="has-text-white">Film club</h1>
          </div>
          <div className="content">
            <h2 className="has-text-white">{details.title}</h2>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <MovieCard path={details.poster_path} />
            </div>
          </div>
          <form onSubmit={save}>
            <div className="field">
              <label className="label" htmlFor="Slug">
                Slug
              </label>
              <input
                className="input"
                id="slug"
                name="slug"
                type="text"
                autoComplete="slug"
                value={details.title
                  .replace(/ /g, "-")
                  .replace(/[^a-zA-Z0-9-_]/g, "")
                  .toLowerCase()}
                required
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="Chosen by">
                Chosen by
              </label>
              <div className="select">
                <select id="chosenBy">
                  <option>Select yob...</option>
                  {data.yobs.map((yob) => (
                    <option value={yob.id}>{yob.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="Season">
                Season
              </label>
              <div className="select">
                <select id="season">
                  {data.seasons
                    .map((season) => (
                      <option value={season.id}>{season.name}</option>
                    ))
                    .reverse()}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="Order">
                Order
              </label>
              <input
                className="input"
                id="order"
                name="order"
                type="text"
                value={data.filmsAggregate.count + 1}
                required
              />
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-link is-light is-danger"
                  onClick={() => setActiveId("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
