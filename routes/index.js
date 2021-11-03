const router = require('express').Router()
const routeProducts = require('./products')
const routeCategory = require('./categories')

const {API_URL, MONGODB_CONNECTION} = process.env



//Routes
router.use('/products', routeProducts)
router.use('/category', routeCategory)

module.exports = router