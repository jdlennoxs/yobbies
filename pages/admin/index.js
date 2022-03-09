import { useState } from "react";
import { query } from "../../helpers/static-props-query";
import AwardAdmin from "../../modules/awards";
import FilmAdmin from "../../modules/films";

const TABS = ["Films", "Awards"];

export default function Admin({ awards }) {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">Film club</h1>
      </div>

      <div className="tabs is-toggle">
        <ul>
          {TABS.map((type) => (
            <li
              className={active === type ? "is-active" : undefined}
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
      {active === "Awards" && <AwardAdmin awards={awards} />}
    </div>
  );
}

export async function getServerSideProps() {
  const { awards } = await query(`
      { awards
          {
              name
              id
          }
      }
  `);
  return {
    props: { awards },
  };
}
