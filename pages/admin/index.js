import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import FilmAdmin from "../../modules/add-film/index";
import Link from "next/link";

const TABS = ["Films", "Awards"];
const GET_FILMS = gql`
  query Films {
    films {
      id
      slug
      title
      poster_path
      chosenByYob {
        name
      }
    }
  }
`;
export default function Admin() {
  const [active, setActive] = useState(TABS[0]);

  const { loading, error, data } = useQuery(GET_FILMS);

  //   if (loading || isLoading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">Film club</h1>
      </div>

      <div className="tabs is-toggle">
        <ul>
          {TABS.map((type) => (
            <li
              className={active === type && "is-active"}
              key={type}
              aria-hidden
              onClick={() => setActive(type)}
            >
              <a>{type}</a>
            </li>
          ))}
        </ul>
      </div>
      {active === "Films" && <FilmAdmin />}
    </div>
  );
}