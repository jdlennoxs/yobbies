import Link from "next/link";
import React from "react";

export default function Detail({
  yob,
  genres,
  runtime,
  countries,
  revenue,
  budget,
  languages,
}) {
  return (
    <div className="block content is-small">
      <div className="table-container">
        <table
          className="table is-narrow has-background-dark"
          style={{ fontSize: "18px" }}
        >
          <tr>
            <td>
              <p className="has-text-white">Chosen by: </p>
            </td>
            <td>
              <Link href={`/yobs/${yob.id}`}>
                <div className="box has-background-dark">
                  <a className="content has-text-centered">
                    <h2 className="m-2 gradient-text">{yob.name}</h2>
                  </a>
                </div>
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Genre: </p>
            </td>
            <td>
              {genres.map((c) => (
                <div className="info-tag">{c.name}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Runtime: </p>
            </td>
            <td>
              <p className="has-text-white">{runtime} minutes</p>
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Country: </p>
            </td>
            <td>
              {countries.map((c) => (
                <div className="info-tag">{c.name}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td>
              <p className="has-text-white">Languages: </p>
            </td>
            <td>
              <div style={{ flexWrap: "wrap" }} className="is-flex">
                {languages.map((c) => (
                  <div className="info-tag">{c.name}</div>
                ))}
              </div>
            </td>
          </tr>

          {budget ? (
            <tr>
              <td>
                <p className="has-text-white">Budget: </p>
              </td>
              <td>
                <p className="has-text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(budget)}
                </p>
              </td>
            </tr>
          ) : null}

          {revenue ? (
            <tr>
              <td>
                <p className="has-text-white">Revenue: </p>
              </td>
              <td>
                <p className="has-text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(revenue)}
                </p>
              </td>
            </tr>
          ) : null}
        </table>
      </div>
    </div>
  );
}
