const httpRequest = require('request');
const express = require("express")
const router = express.Router()
const dataManager = new (require("../../data/manager"))()

Array.prototype.removeDuplicates = function(){
    return [...new Set(this)]
}

function getMovieDataById(movieID, language, callback){
    httpRequest({
        url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_KEY}&language=${language}`,
        method: "GET"
    }, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
            var movie = JSON.parse(body);
            movie.poster = "https://image.tmdb.org/t/p/w780" + movie.poster_path
            movie.backdrop = "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path
            callback(null, movie)
        } else callback(error, null)
    })
}

function mapMovieToDisplayType(displayType, movie){
    if(displayType == "poster") return {
        id: movie.id,
        poster: movie.poster,
        title: movie.title
    }

    if(displayType == "details") return {
        id: movie.id,
        backdrop: movie.backdrop,
        title: movie.title,
        overview: movie.overview
    }
    
    return movie
}

// Get a list of movies that are in the cinema right now.
router.route("/shows/movies").get((request, response) => {
    const displayType = request.query.displayType
    const moviesIDlist = dataManager.getAllShows().map((show) => show.movieID).removeDuplicates()
    let moviesLeft = moviesIDlist.length
    const movieData = []
    moviesIDlist.forEach((movieID) => {
        getMovieDataById(movieID, (request.query.language || "nl-NL"), (error, movie) => {
            if(!error && movie != null) movieData.push(mapMovieToDisplayType(displayType, movie))
            else console.log(`error: ${error}`)
            moviesLeft--
            if(moviesLeft === 0) response.status(200).json(movieData)
        })
    })
})

// Get information about the movie
router.route("/movies/:ID?").get((request, response) => {
    const displayType = request.query.displayType
    getMovieDataById(parseInt(request.params.ID), (request.query.language || "nl-NL"), (error, movie) => {
        if(error) response.status(400).json({
            title: "Error fetching movie."
        });
        else response.status(200).json(mapMovieToDisplayType(displayType, movie))
    })
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

router.route("/cinemas").get((request, response) => {
    response.status(200).json(dataManager.getAllCinemas())
})

module.exports = router