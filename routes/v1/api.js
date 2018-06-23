const request = require('request');
const express = require("express")
const router = express.Router()
const dm = require("../../data/manager")
const dataManager = new dm()

router.route("/movies").get((req, res) => {
    const moviesIDlist = dataManager.getAllMovies()
    const movieData = []
    moviesIDlist.forEach((movieID) => {
        request({
            url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_KEY}&language=nl-NL`,
            method: "GET"
        }, function (error, response, body){
            if (!error && response.statusCode == 200) {
                var movie = JSON.parse(body);
                movie.poster = "https://image.tmdb.org/t/p/w500" + movie.poster_path
                movie.description = movie.overview
                movieData.push(movie)
            } else {
                movieData.push({
                    id: movieID
                })
            }
            
            if(moviesIDlist.length === movieData.length) res.status(200).json(movieData)
        });
    })
})

router.route("/movies/:ID?").get((request, response) => {
    response.status(200).json(dataManager.getMovieById(parseInt(request.params.ID)))
})

router.route("/shows").get((request, response) => {
    response.status(200).json(dataManager.getAllShows())
})

router.route("/halls/:ID?").get((request, response) => {
    response.status(200).json(dataManager.getHallById(parseInt(request.params.ID)))
})

router.route("/cinemas/:ID?").get((request, response) => {
    response.status(200).json(dataManager.getCinemaById(parseInt(request.params.ID)))
})

module.exports = router