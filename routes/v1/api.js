const express = require("express")
const router = express.Router()
const dm = require("../../data/manager")
const dataManager = new dm()

router.route("/movies").get((request, response) => {
    response.status(200).json(dataManager.getAllMovies())
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