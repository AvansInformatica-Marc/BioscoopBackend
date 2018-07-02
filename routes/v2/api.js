const express = require("express")
const router = express.Router()
const dataManager = new (require("../../data/manager"))()
const Movie = require("../../model/movie")

Array.prototype.removeDuplicates = function(){
    return [...new Set(this)]
}

// Get a list of movies that are in the cinema right now.
router.route("/shows/movies").get(async (request, response) => {
    response.status(200).json(await Promise.all(
        dataManager.getAllShows()
            .map((show) => show.movieID)
            .removeDuplicates()
            .map(async (movieID) => await Movie.getByID(movieID, (request.query.language || "nl-NL")))
    ))
})

// Get information about the movie
router.route("/movies/:ID?").get(async (request, response) => {
    response.status(200).json(await Movie.getByID(parseInt(request.params.ID), (request.query.language || "nl-NL")))
})

// Get a list of shows (datetime + location) for a movie
router.route("/movies/:ID?/shows").get((request, response) => {
    const movieID = parseInt(request.params.ID)
    const showList = dataManager.getAllShows().filter((show) => show.movieID === movieID)
    const result = showList.map((show) => {
        const hall = dataManager.getAllHalls().find((hall) => hall.id === show.hallID)
        const cinema = dataManager.getAllCinemas().find((cinema) => cinema.id === hall.cinemaID)
        return {
            showID: show.id,
            hallID: hall.id,
            cinemaID: cinema.id,
            datetime: show.datetime,
            location: cinema.location 
        }
    })
    response.status(200).json(result)
})

// Get a list of cinemas
router.route("/cinemas").get((request, response) => {
    response.status(200).json(dataManager.getAllCinemas())
})

module.exports = router