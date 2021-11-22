const router = require('express').Router()
const {getOrders,postNewOrder} = require('../controllers/orders')

//routes
router.get('/', getOrders)
router.post('/', postNewOrder)


module.exports = router
