const {model, Schema} = require('mongoose')

const categorieSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true }
})

module.exports = model('categories', categorieSchema)