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