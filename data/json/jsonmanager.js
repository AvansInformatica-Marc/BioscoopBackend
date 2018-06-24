require('json5/lib/register')

const cinemas = require("./cinemas.json5")
const halls = require("./halls.json5")
const shows = require("./shows.json5")

module.exports = class {
    getAllShows(){
        return shows
    }

    getAllHalls(){
        return halls
    }

    getAllCinemas(){
        return cinemas
    }
}