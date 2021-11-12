const router = require('express').Router()
const {postUser, getUsers, getSingleUser, logUser} = require('../controllers/users')

//routes
router.get('/', getUsers)
router.post('/', postUser)
router.get('/login', logUser)
router.get('/:id', getSingleUser)

module.exports = router
