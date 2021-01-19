import Detail from "../../components/detail";
import MovieCard from "../../components/movie-card";
import moviesdata from "../../data/movies.json";

export default function MoviePage({ details, director, cast }) {
  //   const detailsMap = {
  //     budget,
  //     genres,
  //     title,
  //     overview,
  //     poster_path,
  //     production_companies,
  //     production_countries,
  //     release_date,
  //     revenue,
  //     runtime,
  //     tagline,
  //     vote_average,
  //   };

  const topCast = cast.slice(0, 10)

  return (
    <div class="my-6 py-6 mx-3">
      <div class="narrow-container">
        <div class="hero">
          <div class="columns">
            <div class="column is-narrow">
              <MovieCard path={details.poster_path} />
            </div>

            <div class="column">
              <div class="block">
                <div class="content">
                  <h1 class="title is-1 has-text-white">{details.title}</h1>
                  <h1 class="subtitle is-3 has-text-primary">
                    ({new Date(details.release_date).getFullYear()})
                  </h1>
                </div>
                <div class="block content is-medium">
                  <p class="has-text-white subtitle is-3">{details.tagline}</p>
                  <p class="has-text-white">{details.overview}</p>
                  <p class="title is-3 has-text-primary">
                    {10 * details.vote_average}%
                  </p>
                  <p class="subtitle is-5 has-text-white">Viewer Rating</p>
                </div>

                <Detail director={director} details={details}/>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 content">
                  <h1 class="title is-1 has-text-white">Top billed cast</h1>
                
      <div class="columns is-multiline is-mobile">
          {topCast.map(c=>(
            
          <div class="column is-one-sixth-desktop is-one-quarter-tablet is-half-mobile">
            <div class="card">
              <div class="card-image">

                  <img 
                  // style={{"object-fit": "cover", width: "150px"}} 
                  src={`https://image.tmdb.org/t/p/w342/${c.profile_path}`} alt="Placeholder image" />

           </div>
           
  <div class="card-content">
    <div class="content">
      <p class="title is-6">{c.name}</p>
      <p class="subtitle is-6">{c.character}</p>
    </div>
    </div>
    </div>
            </div>
          ))}
        
          {/* <MovieCard path={c.profile_path}/>))} */}
        </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(moviesdata).map((slug) => ({
    params: { id: slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // const res = await fetch(
  //   `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=1b18bf813f2054204db80c783520c4c6`
  // );
  // const details = await res.json();
  const movie = moviesdata[context.params.id]
  return {
    props: {
      details: movie.details,
      director: movie.director,
      cast: movie.cast,
    },
  };
}
