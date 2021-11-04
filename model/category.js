const {Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name : {
        type: String,
        required: true
    },

    icon : {
        type: String,
    },

    color : {
        type: String,
    }
})

//Compiling the schema into a Model
module.exports = model('Category', categorySchema)