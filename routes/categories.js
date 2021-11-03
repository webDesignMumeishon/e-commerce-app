const router = require('express').Router()
const {getList, createCategory, deleteCategory, getCategoryById, updateCategory} = require('../controllers/categories')

//routes
router.get('/', getList)
router.post('/', createCategory)
router.delete('/:id', deleteCategory)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategory)

module.exports = router
