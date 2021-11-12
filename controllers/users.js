const {User} = require('../model/user')
const bcrypt = require('bcryptjs')

module.exports = {
    postUser: async (req, res) => { 
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save()
        return res.json(user)
    },

    getUsers: (req, res) => {
        User.find().select('-passwordHash')
        .then(r => {
            res.json(r)
        })
    },

    getSingleUser: (req, res) => {
        //(-) this is to exclude the field 
        User.findById(req.params.id).select('-passwordHash')
        .then(user => {
            res.json(user)
        })
    },
    
}