const router = require('express').Router()
const {postUser, getUsers} = require('../controllers/users')

//routes
router.get('/', getUsers)
router.post('/', postUser)

module.exports = router
