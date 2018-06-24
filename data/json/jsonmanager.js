require('json5/lib/register')

const cinemas = require("./cinemas.json5")
const halls = require("./halls.json5")
const shows = require("./shows.json5")

module.exports = class {
    getAllShows(){
        return shows
    }

    getHalls(){
        return halls
    }

    getCinemas(){
        return cinemas
    }
}