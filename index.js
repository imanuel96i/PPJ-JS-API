// import express from 'express'
const express = require('express')
const {ListProduct, FindProduct, DeleteProduct, NewProduct} = require('./src/products')
// import {productsSlider, products, categories, shoppingCart} from './data.js'
let {products, productsSlider, categories, shoppingCart} = require('./data')

const app = express()
app.use(express.json())

//Pagina inicial Api
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

//Lista de todos los productos
app.get('/api/products', (request, response) => {
    ListProduct(response)
})

//Listar producto por ID
app.get('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    FindProduct(response, id)
})

//Elimina productos por ID
app.delete('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    DeleteProduct(response,id)
})

//Crea un nuevo producto
app.post('/api/products', (request, response) => {
    const produ = request.body
    NewProduct(response, produ)
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server runing on port ${PORT}`)
})