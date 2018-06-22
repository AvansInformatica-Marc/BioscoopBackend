require('json5/lib/register')

const cinemas = require("./cinemas.json5")
const halls = require("./halls.json5")
const movies = require("./movies.json5")
const shows = require("./shows.json5")

module.exports = class {
    getAllMovies(){
        return movies
    }

    getAllShows(){
        return shows
    }

    getHallById(id){
        return halls.filter((hall) => hall.id === id)
    }

    getCinemaById(id){
        return cinemas.filter((cinema) => cinema.id === id)
    }

    getMovieById(id){
        return movies.filter((movie) => movie.id === id)
    }
}