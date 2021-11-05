const {Schema, model } = require('mongoose')

const productSchema = new Schema({
    //Properties: SchemaType
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    richDescription: {
        type: String,
        default: ''
    },

    image: {
        type: String,
        default: ''
    },

    images: [{
        type: String,
    }],

    brand: {
        type: String,
        default: ''
    },

    price:{
        type: Number,
        default: 0
    }, 

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },

    rating:{
        type: Number,
        default: 0
    },

    numReviews:{
        type: Number,
        default: 0
    },
    //this determines if the product is displayed in the main page or not
    isFeature: {
        type: Boolean,
        default: false
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

productSchema.set('toJSON', {
    virtuals: true,
})

//Compiling the schema into a Model
module.exports = model('Products', productSchema)
