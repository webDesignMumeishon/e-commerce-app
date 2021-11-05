const express= require('express')
const {getProducts, createProduct, getSingleProducts, getProductsNames, updateSingleProduct, deleteSingleProduct} = require('../controllers/products')
const {API_URL, MONGODB_CONNECTION} = process.env

router = express.Router()

//Products routes
router.get('/list', getProducts)
router.post('/add', createProduct)
router.get('/:id', getSingleProducts)
router.put('/:id', updateSingleProduct)
router.get('/list/names', getProductsNames)
router.delete('/:id', deleteSingleProduct)

module.exports = router

 