class Hall {
    constructor(object){
        this.id = object.ID
        this.cinemaID = object.CinemaID
        this.name = object.Name
        this.seats = {
            horizontal: object.SeatsHorizontal,
            vertical: object.SeatsVertical
        }
    }
}

module.exports = Hall