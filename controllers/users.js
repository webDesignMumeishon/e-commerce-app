const {User} = require('../model/user')


module.exports = {
    postUser: async (req, res) => { 
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })

        console.log(user);
        user = await user.save()
        return res.json(user)
    },

    getUsers: (req, res) => {
        User.find()
        .then(r => {
            res.json(r)
        })
    }
}