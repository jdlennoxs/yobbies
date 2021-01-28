import Link from "next/link";
import metadata from "../data/metadata.json";
import actorsdata from "../data/actors.json"
import moviesdata from "../data/movies.json";
import StatCard from "../components/stat-card";
import { getLanguages, getGenres, getFemaleDirectors, getAverageBudget, getAverageRevenue, getAverageRating, getOldestReleaseDate } from "../helpers/data-helpers";

export default function Movies({ movies, actors }) {
    return (
        <div className="narrow-container p-6 my-6 ">
            <div className="content block">
                <h1 className="has-text-white">The Statistics</h1>
            </div>

            <div className="columns is-multiline">
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
            {/* <div style={{ height: "200px" }}>
                <ResponsiveLine
                    yScale={{
                        type: 'time',
                        format: "%Y",
                        precision: "year"
                    }}
                    yFormat="time:%Y"
                    data={[
                        {
                            "id": "Jack Scott",
                            "data": [
                                {
                                    "x": 4,
                                    "y": "1967"
                                },
                                {
                                    "x": 6,
                                    "y": "2020"
                                },
                                {
                                    "x": 7,
                                    "y": "1999"
                                },
                            ]
                        }
                    ]}
                />
            </div> */}
        </div>
    );
}

export async function getStaticProps() {
    const movies = moviesdata;
    const actors = actorsdata;
    // const yobs = yobsdata;
    return {
        props: {
            movies,
            actors,
            // yobs
        },
    };
    // will be passed to the page component as props
}
