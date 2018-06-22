require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all("*", function(req, res, next){
    console.log(`${req.method} - ${req.url}`) // Log all requests
    next()
})

app.use("/api/v1/", require("./routes/v1/api.js"))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})

module.exports = app