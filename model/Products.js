const {Schema, model } = require('mongoose')

const productSchema = new Schema({
    //Properties: SchemaType
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

//Compiling the schema into a Model
const Products = model('Products', productSchema)

module.exports = {
    Products
}