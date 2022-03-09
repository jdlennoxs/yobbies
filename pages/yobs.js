import Link from "next/link";
import ActorCard from "../components/actor-card";
import { query } from "../helpers/static-props-query";

export default function Yobs({ yobs }) {
  return (
    <div className="container p-3 my-6 ">
      <h1 className="title is-1 has-text-white">Members</h1>

      <div className="columns is-multiline is-mobile">
        <>
          {yobs.map((yob) => (
            <div className="column is-one-fifth-tablet is-half-mobile">
              <Link href={`/yobs/${yob.id}`}>
                <a>
                  <ActorCard
                    name={yob.name}
                    image={yob.filmChosenBy[0].poster_path}
                    type="film"
                  />
                </a>
              </Link>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { yobs } = await query(`
    { yobs
        {
            name
            id
            filmChosenBy (
              options: {
                sort: [{
                  vote_average: DESC
                }]
                limit: 1
              }
            ) {
              poster_path
            }
        } 
    }
`);
  return {
    props: { yobs },
  };
}
