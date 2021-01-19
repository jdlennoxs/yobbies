import React from "react";

export default function Detail({ director, details }) {
  return (
    <div className="block content is-small">
      <div className="table-container">
        <table className="table is-narrow has-background-dark">
          <tr>
            <td>
              <p className="has-text-white">Directed by: </p>
            </td>
            <td>
              <p className="has-text-white">{director.name}</p>
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Genre: </p>
            </td>
            <td>
              {details.genres.map((c) => (
                <div className="info-tag">{c.name}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Runtime: </p>
            </td>
            <td>
              <p className="has-text-white">{details.runtime} minutes</p>
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Country: </p>
            </td>
            <td>
              {details.production_countries.map((c) => (
                <div className="info-tag">{c.name}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Produced by: </p>
            </td>
            <td>
              <div style={{ flexWrap: "wrap" }} className="is-flex">
                {details.production_companies.map((c) => (
                  <div className="info-tag">{c.name}</div>
                ))}
              </div>
            </td>
          </tr>

          {details.budget ? (
            <tr>
              <td>
                <p className="has-text-white">Budget: </p>
              </td>
              <td>
                <p className="has-text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(details.budget)}
                </p>
              </td>
            </tr>
          ) : null}

          {details.revenue ? (
            <tr>
              <td>
                <p className="has-text-white">Revenue: </p>
              </td>
              <td>
                <p className="has-text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(details.revenue)}
                </p>
              </td>
            </tr>
          ) : null}
        </table>
      </div>
    </div>
  );
}
