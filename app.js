const express = require("express")
const morgan = require("morgan")
const app = express()
const morgar = require('morgan')
const mongoose = require('mongoose')
const {getProducts} = require('./controllers/products')
require('dotenv/config')

const {API_URL, MONGODB_CONNECTION} = process.env

mongoose.connect(MONGODB_CONNECTION, {
    dbName: 'e-commerce'
})
.then((e) => {
    console.log("Database Connection is Ready")
})
.catch(() => {
    console.log("Database Connection Failed")
})

//Middlewares
app.use(express.json())
app.use(morgan('tiny'))

app.get(API_URL + '/get', getProducts)
app.post(API_URL + '/add')

app.listen(3000, () => {
    console.log(API_URL)
    console.log("App Listening on Port http://localhost:3000/")
})
