const express = require("express")
const morgan = require("morgan")
const app = express()
const authJwt = require('./helpers/jwt')
const morgar = require('morgan')
const mongoose = require('mongoose')
const routesEndPoints = require('./routes/index')
const cors = require('cors')
const {getProducts} = require('./controllers/products')
require('dotenv/config')

app.use(cors())
app.options('*', cors())

// .env variables
const {API_URL, MONGODB_CONNECTION} = process.env

//connection in mongoose
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
app.use(authJwt())

app.use(API_URL + '/', routesEndPoints)


app.listen(3000, () => {
    console.log(API_URL)
    console.log("App Listening on Port http://localhost:3000/")
})
