const Category = require('../model/category')
const CategoryBuilder = require('./classes/categoryClass')

module.exports = {
    getList: async (req,res) => {
        const categoryList = await Category.find()

        if(!categoryList){
            return res.status(500).json({success: false})
        }

        return res.send(categoryList)
    },

    getCategoryById: async (req, res) => {
        const category = await Category.findById(req.params.id)

        if(!category){
            return res.status(500).json({
                message: "The category with the given ID was not found"
            })
        }
        else{
            return res.status(200).json(category)
        }

    },

    createCategory: (req, res) => {
        const newCategory = new CategoryBuilder(req.body.name)
        newCategory.setIcon(req.body.icon).setColor(req.body.color)

        const newCategoryDocument = new Category(newCategory.build())
        newCategoryDocument.save()
        .then(createdProduct => {
            res.status(201).json(createdProduct)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
    },

    deleteCategory: (req, res) => {
        Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if(category){
                return res.status(200).json({success: true, message: `the category was deleted`})
            }
            else{
                return res.status(404).json({success: false, message: 'Category not found'})
            }

        })
        .catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    }
}
