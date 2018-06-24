const httpRequest = require('request');
const express = require("express")
const router = express.Router()
const dataManager = new (require("../../data/manager"))()

Array.prototype.removeDuplicates = function(){
    return [...new Set(this)]
}

function getMovieDataById(movieID, callback){
    httpRequest({
        url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_KEY}&language=nl-NL`,
        method: "GET"
    }, function (error, response, body){
        if (!error && response.statusCode == 200) {
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

router.route("/shows/movies").get((request, response) => {
    const displayType = request.query.displayType
    const moviesIDlist = dataManager.getAllShows().map((show) => show.movieID).removeDuplicates()
    let moviesLeft = moviesIDlist.length
    const movieData = []
    moviesIDlist.forEach((movieID) => {
        getMovieDataById(movieID, (error, movie) => {
            if(!error) movieData.push(mapMovieToDisplayType(displayType, movie))
            moviesLeft--
            if(moviesLeft === 0) response.status(200).json(movieData)
        })
    })
})

router.route("/movies/:ID?").get((request, response) => {
    const displayType = request.query.displayType
    getMovieDataById(parseInt(request.params.ID), (error, movie) => {
        if(error) response.status(400).json({
            title: "Error fetching movie."
        });
        else response.status(200).json(mapMovieToDisplayType(displayType, movie))
    })
})

router.route("/shows").get((request, response) => {
    response.status(200).json(dataManager.getAllShows())
})

module.exports = router