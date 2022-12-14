const {model, Schema} = require('mongoose')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 14/12/2022
 * Fecha ultima modificación: 14/12/2022
*/

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
})

module.exports = model('products', productSchema)