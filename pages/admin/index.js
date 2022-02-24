import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

export default function Admin() {
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

  const { loading, error, data } = useQuery(GET_FILMS);

  //   if (loading || isLoading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container p-3 my-6 ">
      <div className="content">
        <h1 className="has-text-white">Film club</h1>
      </div>

      <div className="columns is-multiline block">
        <div className="column is-one-third">
          <Link href="/admin/film/search">
            <div className="box has-background-dark">
              <a className="content has-text-centered">
                <h2 className="m-2 gradient-text">Add film</h2>
              </a>
            </div>
          </Link>
        </div>

        <div className="column is-one-third">
          <Link href="/admin/award/add">
            <div className="box has-background-dark">
              <a className="content has-text-centered">
                <h2 className="m-2 gradient-text">Add award</h2>
              </a>
            </div>
          </Link>
        </div>
        <div className="column is-one-third">
          <Link href="/admin/film/edit">
            <div className="box has-background-dark">
              <a className="content has-text-centered">
                <h2 className="m-2 gradient-text">Edit film</h2>
              </a>
            </div>
          </Link>
        </div>
        <div className="column is-one-third">
          <Link href="/admin/award/assign">
            <div className="box has-background-dark">
              <a className="content has-text-centered">
                <h2 className="m-2 gradient-text">Assign award</h2>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
