const Products = require('../model/products')
const Category = require('../model/category')
const ProductBuilder = require('../controllers/classes/productClass')


module.exports = {
    createProduct: async (req, res) =>{

        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).send('Invalid Category')

        console.log(req.body);
        const newProduct = new ProductBuilder(req.body.name)
        newProduct.setDescription(req.body.description)
        .setRichDescription(req.body.richDescription)
        .setImg(req.body.image)
        .setBrand(req.body.brand)
        .setPrice(req.body.price)
        .setCategory(req.body.category)
        .setStock(req.body.countInStock)
        .setRating(req.body.rating)
        .setNumReviews(req.body.numReviews)
        .setFeature(req.body.isFeature)


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
    },

    getSingleProducts: (req, res) => {
        const productList = Products.findById(req.params.id)
        .then(list => {
            res.json(list)
        })
    },

    getProductsNames: (req, res) => {
        //.select is to select an specific field of the document
        //if i want to select multiple fields I enter the field names separete by spacing ('name category')
        //if I want to exclude a fild I insert the field name and a minus symbol ('-_id')
        Products.find().select('name -_id')
        .then(list => {
            res.json(list)
        })
    }


}