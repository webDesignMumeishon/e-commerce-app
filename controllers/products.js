const Products = require('../model/products')
const ProductBuilder = require('../controllers/classes/productClass')


module.exports = {
    createProduct: (req, res) =>{
        const {name, image, countInStock} = req.body

        const newProduct = new ProductBuilder(name)
        newProduct.setImg(image).setStock(countInStock)

        Products.create(newProduct.build())
        .then(response => {
            res.status(201).json({
                msg: "Product Created",
                response
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
    },

    getProducts: (req, res) => {
        const productList = Products.find()
        .then(list => {
            res.json(list)
        })
    }
}