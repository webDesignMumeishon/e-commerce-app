const router = require('express').Router()
const {postUser, getUsers, getSingleUser, logUser, countUsers, deleteUser} = require('../controllers/users')

//routes
router.get('/', getUsers)
router.post('/', postUser)
router.get('/login', logUser)
router.get('/count', countUsers)
router.get('/:id', getSingleUser)
router.delete('/delete/:id', deleteUser)

module.exports = router
