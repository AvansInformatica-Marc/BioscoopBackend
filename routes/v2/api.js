const express = require("express")
const router = express.Router()
const dataManager = new (require("../../data/manager"))()
const Movie = require("../../model/movie")

Array.prototype.removeDuplicates = function(){
    return [...new Set(this)]
}

// Get a list of movies that are in the cinema right now.
router.route("/shows/movies").get(async (request, response) => {
    try {
        response.status(200).json(await Promise.all(
            (await dataManager.shows)
                .map((show) => show.movieID)
                .removeDuplicates()
                .map(async (movieID) => await Movie.getByID(movieID, (request.query.language || "nl-NL")))
        ))
    } catch (error) {
        console.log(error)
        response.status(500).json([])
    }
})

// Get information about the movie
router.route("/movies/:ID?").get(async (request, response) => {
    try { 
        response.status(200).json(await Movie.getByID(parseInt(request.params.ID), (request.query.language || "nl-NL")))    
    } catch (error) {
        console.log(error)
        response.status(500).json({})
    }
})

// Get a list of shows (datetime + location) for a movie
router.route("/movies/:ID?/shows").get(async (request, response) => {
    try {
        const movieID = parseInt(request.params.ID)
        const showList = (await dataManager.shows).filter((show) => show.movieID === movieID)
        const result = await Promise.all(showList.map(async (show) => {
            const hall = (await dataManager.halls).find((hall) => hall.id === show.hallID)
            const cinema = (await dataManager.cinemas).find((cinema) => cinema.id === hall.cinemaID)
            show.hall = hall
            show.cinema = cinema
            return show
        }))
        response.status(200).json(result)
    } catch (error) {
        console.log(error)
        response.status(500).json([])
    }
})

// Get a list of cinemas
router.route("/cinemas").get(async (request, response) => {
    try {
        response.status(200).json(await dataManager.cinemas)
    } catch (error) {
        console.log(error)
        response.status(500).json([])
    }
})

// Update SeatsTaken in the DB and return the seats.
router.route("/shows/:ID?/tickets").patch(async (request, response) => {
    try {
        const showID = parseInt(request.params.ID)
        const requestedAmountOfSeats = parseInt(request.query.amount) || 1

        const show = (await dataManager.shows).find((show) => show.id === showID)
        const hall = (await dataManager.halls).find((hall) => hall.id === show.hallID)

        const amountOfSeats = hall.seats.vertical * hall.seats.horizontal
        const newSeatsTaken = show.seatsTaken + requestedAmountOfSeats

        if(amountOfSeats < newSeatsTaken){
            response.status(400).json([])
            return
        }

        await dataManager.updateSeatsTakenCount(show.id, newSeatsTaken)

        const seats = []
        for(var i = 0; i < requestedAmountOfSeats; i++) seats.push((newSeatsTaken - i).toString())
        response.status(200).json(seats)
    } catch (error) {
        console.log(error)
        response.status(500).json([])
    }
})

module.exports = router