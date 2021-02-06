import Link from "next/link";
import metadata from "../data/metadata.json";
import actorsdata from "../data/actors.json"
import moviesdata from "../data/movies.json";
import yobsdata from "../data/yobs.json";
import StatCard from "../components/stat-card";
import {
    getLanguages,
    getGenres,
    getFemaleDirectors,
    getAverageBudget,
    getAverageRevenue,
    getAverageRating,
    getOldestReleaseDate,
    getFilmsByYear,
    getFilmsPerCountry,
    getFilmsPerGenre
} from "../helpers/data-helpers";
import Scatter from "../components/scatter";
import Geo from "../components/geo";
import Radar from "../components/radar";


export default function Movies({ movies, actors, yobs }) {
    return (
        <div className="container p-3 my-6 ">
            <div className="content block">
                <h1 className="has-text-white">The Statistics</h1>
            </div>

            <div className="columns is-multiline block">
                <div className="column is-one-third-tablet">
                    <StatCard title="Number of films" value={Object.keys(movies).length} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Number of languages" value={getLanguages(movies).size} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Number of genres" value={getGenres(movies).size} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Female directors" value={getFemaleDirectors(movies).size} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Average budget" value={`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(getAverageBudget(movies) / 1000000)}m`} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Average revenue" value={`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(getAverageRevenue(movies) / 1000000)}m`} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Total actors" value={Object.keys(actors).length} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Average rating" value={`${(10 * (getAverageRating(movies))).toFixed(0)}%`} />
                </div>
                <div className="column is-one-third-tablet">
                    <StatCard title="Oldest release" value={getOldestReleaseDate(movies)} />
                </div>
            </div>

            <div className="content block">
                <h3 className="has-text-white">Selection by Release Year</h3>
                <Scatter data={getFilmsByYear({ movies, yobs })} />

                <h3 className="has-text-white">Pictures by Country</h3>
                <Geo data={getFilmsPerCountry({ movies })} />

                <h3 className="has-text-white">Genre Count</h3>
                <Radar data={getFilmsPerGenre({ movies })} />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const movies = moviesdata;
    const actors = actorsdata;
    const yobs = yobsdata;
    return {
        props: {
            movies,
            actors,
            yobs
        },
    };
    // will be passed to the page component as props
}
