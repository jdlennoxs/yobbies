import { query } from "../../helpers/static-props-query";
import Link from "next/link";
import MovieCard from "../../components/movie-card";

export default function Yobs({ yob }) {
  return (
    <div className="my-6 py-6 mx-3">
      <div className="narrow-container">
        <div className="hero">
          <div className="columns">
            <div className="column">
              <div className="block">
                <div className="content">
                  <h1 className="title is-1 has-text-white">{yob.name}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <h2 className="has-text-white">Films</h2>
          </div>
          <div className="columns is-multiline is-mobile">
            {yob.filmChosenBy.map((film) => (
              <div className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile">
                <Link href={`/films/${film.slug}`}>
                  <a className="poster-link">
                    <MovieCard path={film.poster_path} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { yobs } = await query(`
    { yobs
        {
            id
        } 
    }
  `);
  const paths = yobs.map((yob) => ({
    params: { id: yob.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { yobs } = await query(`
      { yobs
            (
                where: {id: ${context.params.id}}
            )
          {
              name
              filmChosenBy {
                slug
                poster_path
                nominatedForAward {
                  name
                }
              }
              nominatedForAward {
                name
              }
          }
      }
  `);
  return {
    props: { yob: yobs[0] },
  };
}
