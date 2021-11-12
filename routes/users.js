const router = require('express').Router()
const {postUser, getUsers, getSingleUser} = require('../controllers/users')

//routes
router.get('/', getUsers)
router.post('/', postUser)
router.get('/:id', getSingleUser)

module.exports = router
