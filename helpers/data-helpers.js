import codesMap from "../data/countryCodes.json"

export const getLanguages = (movies) => {
    const languages = new Set()
    Object.keys(movies).forEach((movie) => {
        movies[movie].details.spoken_languages.forEach((language) => {
            languages.add(language.english_name)
        })
    })
    return languages
}

export const getGenres = (movies) => {
    const genres = new Set()
    Object.keys(movies).forEach((movie) => {
        movies[movie].details.genres.forEach((genre) => {
            genres.add(genre.name)
        })
    })
    return genres
}

export const getFemaleDirectors = (movies) => {
    const femaleDirectors = new Set()
    Object.keys(movies).forEach((movie) => {
        if (movies[movie].director.gender === 1) {
            femaleDirectors.add(movies[movie].director.name)
        }
    })
    return femaleDirectors
}

export const getAverageBudget = (movies) => {
    let totalBudget = 0
    let count = 0
    Object.keys(movies).forEach((movie) => {
        if (movies[movie].details.budget > 0) {
            totalBudget += movies[movie].details.budget
            count++
        }
    })
    return totalBudget / count
}


export const getAverageRevenue = (movies) => {
    let totalRevenue = 0
    let count = 0
    Object.keys(movies).forEach((movie) => {
        if (movies[movie].details.revenue > 0) {
            totalRevenue += movies[movie].details.revenue
            count++
        }
    })
    return totalRevenue / count
}


export const getAverageRating = (movies) => {
    let totalRating = 0
    let count = 0
    Object.keys(movies).forEach((movie) => {
        if (movies[movie].details.vote_average > 0) {
            totalRating += movies[movie].details.vote_average
            count++
        }
    })
    return totalRating / count
}

export const getOldestReleaseDate = (movies) => {
    let oldestDate = new Date()
    Object.keys(movies).forEach((movie) => {
        if (new Date(movies[movie].details.release_date) < oldestDate) {
            oldestDate = new Date(movies[movie].details.release_date)
        }
    })
    return oldestDate.getFullYear()
}

export const getFilmsByYear = ({ movies, yobs }) => {
    return Object.keys(yobs).map(yob => {
        const name = yobs[yob].name
        const films = Object.values(movies).filter(m => m.chosen_by === yob)
        const data = films.map(f => ({ x: f.order, title: f.details.title, y: parseInt(f.details.release_date.substring(0, 4)), z: f.details.runtime }))
        return {
            id: name,
            data,
        }
    })
}

export const getFilmsPerCountry = ({ movies }) => {
    const countries = []
    Object.keys(movies).map(movie => {
        movies[movie].details.production_countries.forEach((c) => {
            const iso = codesMap[c.iso_3166_1]
            const existing = countries.find(n => n.id === iso)
            if (existing) {
                existing.value += 1
            } else {
                countries.push({ id: iso, value: 1 })
            }
        })
    })
    return countries
}


export const getFilmsPerGenre = ({ movies, yobs, yobNames }) => {
    const collection = []

    Object.keys(movies).forEach(movie => {
        movies[movie].details.genres.forEach((g) => {
            const existing = collection.find(n => n.genre === g.name)
            if (existing) {
                existing[yobs[movies[movie].chosen_by].name] += 1
                existing.Total += 1
            } else {
                const empty = {}
                yobNames.forEach(n => {
                    empty[n] = 1
                })
                empty[yobs[movies[movie].chosen_by].name] += 1
                collection.push({ genre: g.name, Total: 2, ...empty })
            }
        })
    })
    return collection
}

export const getActorsInMultipleFilms = ({ actors, movies }) => {
    const multi = []
    Object.keys(actors).forEach(actor => {
        if (actors[actor].movies.length > 1) {
            const movieNames = actors[actor].movies.map(m => movies[m].details.title)
            multi.push({ name: actors[actor].name, movies: movieNames.join(", "), profile_path: actors[actor].profile_path })
        }
    })
    return multi
}