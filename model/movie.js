const httpRequest = require('request')

class Movie {
    constructor(json){
        this.id = json.id
        this.images = {
            header: "https://image.tmdb.org/t/p/w1280" + json.backdrop_path,
            poster: "https://image.tmdb.org/t/p/w780" + json.poster_path
        }
        this.title = json.title
        this.description = json.overview
    }

    static getByID(ID, language) {
        return new Promise((resolve, reject) => {
            httpRequest({
                url: `https://api.themoviedb.org/3/movie/${ID}?api_key=${process.env.TMDB_KEY}&language=${language}`,
                method: "GET"
            }, (error, response, body) => {
                if (!error && response.statusCode >= 200 && response.statusCode < 400) resolve(new Movie(JSON.parse(body)))
                else reject(error)
            })
        })
    }
}

module.exports = Movie