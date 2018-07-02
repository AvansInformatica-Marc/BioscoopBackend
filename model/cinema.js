class Cinema {
    constructor(object){
        this.id = object.ID
        this.location = {
            city: object.City,
            street: object.Street,
            postalcode: object.PostalCode,
            number: object.Number
        },
        this.phonenumber = object.PhoneNumber
        this.email = object.Email
    }
}

module.exports = Cinema