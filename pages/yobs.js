import { query } from "../helpers/static-props-query";

export default function Yobs({ yobs }) {
  return <div className="container p-3 my-6 ">{JSON.stringify(yobs)}</div>;
}

export async function getStaticProps() {
  const { yobs } = await query(`
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
