const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    //We need to link this order item to the product
    product: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema)