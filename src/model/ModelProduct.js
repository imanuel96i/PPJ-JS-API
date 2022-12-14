const {model, Schema} = require('mongoose')

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
})

module.exports = model('products', productSchema)