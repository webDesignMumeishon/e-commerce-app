const {Products} = require('../model/Products')


module.exports = {
    createProduct: (req, res) =>{
        const {name, image, countInStock} = req.body

        Products.create(req.body)
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