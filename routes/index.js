const router = require('express').Router()
const routeProducts = require('./products')
const routeCategory = require('./categories')
const routerOrders = require('./orders')
const routeUser = require('./users')

const {API_URL, MONGODB_CONNECTION} = process.env

//Routes
router.use('/products', routeProducts)
router.use('/category', routeCategory)
router.use('/users', routeUser)
router.use('/orders', routerOrders)

module.exports = router