const Products = require('../model/products')
const Category = require('../model/category')
const ProductBuilder = require('../controllers/classes/productClass')
const mongoose = require('mongoose')


module.exports = {
    createProduct: async (req, res) =>{

        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).send('Invalid Category')

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
        //if i want to display the products information with the category name instead of the category ID  
        //I need to use the .populate(). Populate means that any connected id or field to another table will be display 
        // in this table
        Products.findById(req.params.id).populate('category')
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
    },

    updateSingleProduct: async (req, res) => {
        //here we check if the id is a valid one with a mongoose method
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Invalid product id')
        }

        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).send('Invalid Category')

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

        const product = await Products.findByIdAndUpdate(
            req.params.id,
            newProduct.build(),
            //This is the third parameter used to get back the updated category and not the old one
            {new: true}
        )

        if(!product){
            return res.status(400).send('The product cannot be updated')
        }
        else{
            return res.send(product)
        }

    },

    deleteSingleProduct: (req, res) => {
        Products.findByIdAndRemove(req.params.id)
        .then(product => {
            if(product){
                return res.status(200).json({success: true, message: `the product was deleted`})
            }
            else{
                return res.status(404).json({success: false, message: 'Product not found'})
            }

        })
        .catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    },

    getProductCount: (req, res) => {
        Products.countDocuments()
        .then(count => {
            if(!count) return res.status(500).json({success: false})
            else return res.json({success: true, count})    
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    },

    getFeatureProducts: (req, res) => {
        const count = req.params.count ? req.params.count : 0 
        //we put the fields that we want inside the brackets
        //in this case I will get all the products with feature true
        Products.find({isFeature: true}).limit(+count)
        .then(count => {
            if(!count) return res.status(500).json({success: false})
            else return res.json({success: true, count})    
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    },
    


}