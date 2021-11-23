const router = require('express').Router()
const {getOrders,postNewOrder, getOrderById} = require('../controllers/orders')

//routes
router.get('/:id', getOrderById)
router.get('/', getOrders)
router.post('/', postNewOrder)


module.exports = router
