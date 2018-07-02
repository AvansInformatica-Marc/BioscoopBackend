const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    insecureAuth : true
})

db.connect((error) => {
    console.log(error ? error : `Connected to ${process.env.DB_HOST}:${process.env.DB_DATABASE}`)
})

module.exports = db