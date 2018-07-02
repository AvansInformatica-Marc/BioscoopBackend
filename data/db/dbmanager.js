const Show = require("../../model/show")
const Hall = require("../../model/hall")
const Cinema = require("../../model/cinema")

class DBManager {
    constructor() {
        this.db = require("./mysql-connector")
    }

    getAllShows(){
        const db = this.db
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Show", (error, rows, fields) => {
                try {
                    if (error) throw error
                    resolve(rows.map((item) => new Show(item)))
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    getAllHalls(){
        const db = this.db
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Hall", (error, rows, fields) => {
                try {
                    if (error) throw error
                    resolve(rows.map((item) => new Hall(item)))
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    getAllCinemas(){
        const db = this.db
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Cinema", (error, rows, fields) => {
                try {
                    if (error) throw error
                    resolve(rows.map((item) => new Cinema(item)))
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

module.exports = DBManager