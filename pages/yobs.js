import { groupBy } from "lodash";
import useSWR from "swr";
import { gql, useMutation } from "@apollo/client";
import { query, mutation } from "../helpers/apollo-client";
import metadata from "../data/metadata.json";
import moviesdata from "../data/movies.json";

export const staticquery = (query) =>
  fetch("http://localhost:3001/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Yobs({ yobs }) {
  // const ADD_COUNTRY = gql`
  //   mutation UpdateCountries(
  //     $where: CountryWhere
  //     $update: CountryUpdateInput
  //   ) {
  //     updateCountries(where: $where, update: $update) {
  //       countries {
  //         name
  //       }
  //     }
  //   }
  // `;

  // const [addCountry, { data, loading, error }] = useMutation(ADD_COUNTRY);

  // updates.forEach((u) => {
  //   addCountry({
  //     variables: { where: { iso: u.iso }, update: { name: u.name } },
  //   });
  // });
  return <div className="container p-3 my-6 ">{JSON.stringify(yobs)}</div>;
}

export async function getStaticProps() {
  const { yobs } = await staticquery(`
    { yobs
        {
            name 
            id
        } 
    }
`);
  return {
    props: { yobs },
  };
}
