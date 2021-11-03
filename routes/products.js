const express= require('express')
const {getProducts, createProduct} = require('../controllers/products')
const {API_URL, MONGODB_CONNECTION} = process.env

router = express.Router()

//Products routes
router.get('/list', getProducts)
router.post('/add', createProduct)

module.exports = router

 