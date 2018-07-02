class Cinema {
    constructor(object){
        this.id = object.ID
        this.location = {
            city: object.City,
            street: object.Street,
            postalcode: object.PostalCode,
            number: object.Number
        },
        this.PhoneNumber = object.SeatsTaken
        this.Email = object.SeatsTaken
    }
}

module.exports = Cinema