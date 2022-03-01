import { query } from "../../helpers/static-props-query";
import Link from "next/link";
import MovieCard, { getPath } from "../../components/movie-card";

export default function Yobs({ yob }) {
  return (
    <div class="my-6 py-6 mx-3">
      <div class="narrow-container">
        <div class="hero">
          <div class="columns">
            <div class="column is-narrow">
              {/* <MovieCard path={details.poster_path} /> */}
            </div>

            <div class="column">
              <div class="block">
                <div class="content">
                  <h1 class="title is-1 has-text-white">{yob.name}</h1>
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
  console.log(paths);
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
