const {Order} = require('../model/order')
const {OrderItem} = require('../model/order-item')

// console.log(OrderItem);

module.exports = {
    getOrders: async (req, res) => {
        const orderList = await Order.find()

        if(!orderList){
            res.status(500).json({success: false})
        }
        res.send(orderList)
    },

    postNewOrder: async (req, res) => {

        const orderItemsIds = Promise.all(req.body.orderItems.map(async (ordItm) => {
            let newOrderItem = new OrderItem({
                quantity: ordItm.quantity,
                product: ordItm.product
            })
            newOrderItem = await newOrderItem.save()
            return newOrderItem._id
        }))

        const orderIdsItemsResolve = await orderItemsIds

        let newOrder = new Order({
            orderItems: orderIdsItemsResolve,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            dateOrdered: req.body.dateOrdered,
        })

        newOrder = await newOrder.save()

        if(!newOrder){
            return res.status(400).send('The order cannot be created')
        }
        res.send(newOrder)
    }

}