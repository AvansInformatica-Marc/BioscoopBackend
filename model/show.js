class Show {
    constructor(object){
        this.id = object.ID
        this.hallID = object.HallID
        this.movieID = object.MovieID
        this.datetime = object.DateTime
        this.seatsTaken = object.SeatsTaken
    }
}

module.exports = Show