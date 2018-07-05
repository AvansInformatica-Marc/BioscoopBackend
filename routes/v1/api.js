const express = require("express")
const router = express.Router()

const deprecatedMovie = {
    id: 0,
    poster: "https://www.iconexperience.com/_img/g_collection_png/standard/512x512/sign_warning.png",
    title: "Old version",
    backdrop: "https://www.iconexperience.com/_img/g_collection_png/standard/512x512/sign_warning.png",
    overview: "The version of this app is outdated and will stop working. Your tickets will remain accessible. Please upgrade to a newer version of this app."
}

// Get a list of movies that are in the cinema right now.
router.route("/shows/movies").get((request, response) => {
    response.status(302).json([deprecatedMovie])
})

// Get information about the movie
router.route("/movies/:ID?").get((request, response) => {
    response.status(302).json(deprecatedMovie)
})

// Get a list of shows (datetime + location) for a movie
router.route("/movies/:ID?/shows").get((request, response) => {
    response.status(302).json([])
})

// Get a list of cinemas
router.route("/cinemas").get((request, response) => {
    response.status(302).json([
        {
            id: 0,
            location: {
                city: "Warning: old API",
                street: "Warning: old API",
                postalcode: "Warning: old API",
                number: 0
            },
            phonenumber: "Warning: old API",
            email: "Warning: old API"
        }
    ])
})

module.exports = router