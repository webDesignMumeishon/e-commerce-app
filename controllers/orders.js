const {Order} = require('../model/order')
const {OrderItem} = require('../model/order-item')

module.exports = {
    getOrders: async (req, res) => {
        //-1 to order from newest to oldest
        const orderList = await Order.find().populate('user', "name").sort({'dateOrdered': -1})

        if(!orderList){
            res.status(500).json({success: false})
        }
        res.send(orderList)
    },

    getOrderById: async (req, res) => {
        const order = await Order.findById(req.params.id)
        .populate('user')
        //this is to populate the product inside the orderItems property
        // .populate({path: 'orderItems', populate: 'product'})
        //this is to populate the category inside the prodcut property inside of OrderItems
        .populate({path: 'orderItems', populate: {path:'product', populate: "category"}})

        if(!order){
            res.status(500).json({success: false})
        }
        res.send(order)
    },

    postNewOrder: async (req, res) => {
        console.log(req.body.orderItems);
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (ordItm) => {
            let newOrderItem = new OrderItem({
                quantity: ordItm.quantity,
                product: ordItm.id
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
            user: req.body.user,
            dateOrdered: req.body.dateOrdered,
        })

        newOrder = await newOrder.save()

        if(!newOrder){
            return res.status(400).send('The order cannot be created')
        }
        res.send(newOrder)
    }

}