import { query } from "../../../helpers/static-props-query";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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
    films {
      slug
      title
      watchedInSeason {
        id
      }
    }
  }
`;

const UPDATE_AWARD = gql`
  mutation UpdateAwards($update: AwardUpdateInput, $where: AwardWhere) {
    updateAwards(update: $update, where: $where) {
      info {
        relationshipsCreated
      }
    }
  }
`;
export default function Award({ award, seasonsAggregate }) {
  const { loading, error, data } = useQuery(GET_ADD_DATA);
  const [season, setSeason] = useState(String(seasonsAggregate.count));
  const [
    updateAwards,
    { data: nodesCreated, loading: posting, error: failed },
  ] = useMutation(UPDATE_AWARD);
  console.log(process.env.NEXT_URL);

  const save = (event) => {
    event.preventDefault();

    const where = { id: award.id };
    const getUpdate = (type) => {
      console.log(type);
      const key = `${type}NominatedFor`;
      const identifier = type === "yob" ? "id" : "slug";
      let update = {
        [key]: {
          connect: {
            where: {
              node: {
                [identifier]: event.target[type].value,
              },
            },
            edge: {
              season: event.target.season.value,
              detail: event.target.detail.value,
            },
          },
        },
      };
      if (event.target.isWinner.checked) {
        const key = `${type}WinnerOf`;
        let winnerOf = {
          [key]: {
            connect: {
              where: {
                node: {
                  [identifier]: event.target[type].value,
                },
              },
              edge: {
                season: event.target.season.value,
                detail: event.target.detail.value,
              },
            },
          },
        };
        update = { ...update, ...winnerOf };
      }
      return update;
    };

    const update = getUpdate(award.type);

    updateAwards({
      variables: { where, update },
    });
  };

  return (
    <div className="my-6 py-6 mx-3">
      <div className="narrow-container">
        <div className="hero">
          <div className="columns">
            <div className="column">
              <div className="block">
                <div className="content">
                  <h1 className="title is-1 has-text-white">{award.name}</h1>
                  <div className="block content is-medium">
                    <p className="has-text-white subtitle is-3">
                      {award.description}
                    </p>
                  </div>
                </div>
                {nodesCreated && (
                  <div className="content">
                    <h1 className="has-text-success">Success</h1>
                  </div>
                )}
                {data && (
                  <form onSubmit={save}>
                    <div className="field">
                      <label className="label" htmlFor="Season">
                        Season
                      </label>
                      <div className="select">
                        <select
                          id="season"
                          onChange={(event) => {
                            setSeason(event.target.value);
                          }}
                        >
                          {data.seasons
                            .map((season) => (
                              <option value={season.id}>{season.name}</option>
                            ))
                            .reverse()}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="Detail">
                        Detail
                      </label>
                      <input
                        className="input"
                        id="detail"
                        name="detail"
                        type="text"
                      />
                    </div>
                    {award.type === "yob" && (
                      <div className="field">
                        <label className="label" htmlFor="Yob">
                          Yob
                        </label>
                        <div className="select">
                          <select id="yob">
                            <option>Select yob...</option>
                            {data.yobs.map((yob) => (
                              <option value={yob.id}>{yob.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    {award.type === "film" && (
                      <div className="field">
                        <label className="label" htmlFor="Film">
                          Film
                        </label>
                        <div className="select">
                          <select id="film">
                            <option>Select film...</option>
                            {data.films
                              .filter((film) => {
                                return film.watchedInSeason.id === season;
                              })
                              .map((film) => (
                                <option value={film.slug}>{film.title}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="field">
                      <label
                        className="checkbox has-text-white"
                        htmlFor="isWinner"
                      >
                        Is winner
                        <input type="checkbox" id="isWinner" name="isWinner" />
                      </label>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link" type="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { awards } = await query(`
    { awards
        {
            id
        } 
    }
  `);
  const paths = awards.map((award) => ({
    params: { id: award.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { awards, seasonsAggregate } = await query(`
      { awards
            (
                where: {id: "${context.params.id}"}
            )
          {
              name
              description
              type
              id
          }
          seasonsAggregate {
              count
          }
        }
  `);
  return {
    props: { award: awards[0], seasonsAggregate },
  };
}
