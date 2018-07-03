require('json5/lib/register')

const cinemas = require("./cinemas.json5")
const halls = require("./halls.json5")
const shows = require("./shows.json5")

module.exports = class {
    get shows(){
        return new Promise((resolve, reject) => {
            resolve(shows)
        })
    }

    get halls(){
        return new Promise((resolve, reject) => {
            resolve(halls)
        })
    }

    get cinemas(){
        return new Promise((resolve, reject) => {
            resolve(cinemas)
        })
    }

    updateSeatsTakenCount(showID, newSeatsTaken){
        return new Promise((resolve, reject) => {
            reject(new Error("Method not supported: use a database instead"))
        })
    }
}