const express= require('express')
const {getProducts, createProduct, getSingleProducts, getProductsNames, updateSingleProduct, 
    deleteSingleProduct,getProductCount, getFeatureProducts, getProductsCategory} = require('../controllers/products')
const {API_URL, MONGODB_CONNECTION} = process.env

router = express.Router()

//Products routes
router.get('/list', getProducts)
router.post('/add', createProduct)
router.get('/:id', getSingleProducts)
router.get('/get/feature/:count', getFeatureProducts)
router.get('/get/count', getProductCount)
router.get('/get/category', getProductsCategory)
router.put('/:id', updateSingleProduct)
router.get('/list/names', getProductsNames)
router.delete('/:id', deleteSingleProduct)

module.exports = router

 