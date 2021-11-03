const router = require('express').Router()
const {getList, createCategory, deleteCategory, getCategoryById} = require('../controllers/categories')

//routes
router.get('/', getList)
router.post('/', createCategory)
router.delete('/:id', deleteCategory)
router.get('/:id', getCategoryById)

module.exports = router
