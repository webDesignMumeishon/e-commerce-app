const {User} = require('../model/user')
const jwt = require('jsonwebtoken')
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
        if(!user) return res.json({message:"The user couldn't be created"})
        return res.json(user)
    },

    getUsers: (req, res) => {
        User.find().select('-passwordHash')
        .then(r => {
            res.json(r)
        })
        .catch(err => {
            console.log(err);
        })
    },

    getSingleUser: (req, res) => {
        //(-) this is to exclude the field 
        User.findById(req.params.id).select('-passwordHash')
        .then(user => {
            if(!user) return res.json({message: "The user wasn't found"})

            return res.json(user)
        })
        .catch(err => {
            return res.json(err)
        })
    },

    logUser: async (req, res) => {
        // first we check if the user exists
        const user = await User.findOne({email: req.body.email})         
        if(!user) return res.status(400).send("The user was not found")

        // after we make sure the user is in there we get the hash password
        // important method of bcrypt to comapre the passwords
        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.TOKEN_PASSWORD,
                {expiresIn: '1d'}
            )
            return res.status(200).send({user: user.email, token: token, id: user.id})
        }
        else{
            return res.status(400).send("Password in wrong")
        }
    },

    countUsers: async (req, res) => {
        User.countDocuments()
        .then(count => {
            if(!count) return res.status(500).json({success: false})
            else return res.json({success: true, count})    
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    },

    deleteUser: (req, res) => {
        User.findByIdAndRemove(req.params.id)
        .then(user => {
            if(user){
                return res.status(200).json({success: true, message: `the user was deleted`})
            }
            else{
                return res.status(404).json({success: false, message: 'user not found'})
            }

        })
        .catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    },

    
}