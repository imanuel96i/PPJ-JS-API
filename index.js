// import express from 'express'
const express = require('express')
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
    response.json(products)
})

//Listar producto por ID
app.get('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const product = products.find(pro => pro.id === id)
    product ? response.json(product) : response.status(404).end()
})

//Elimina productos por ID
app.delete('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    products = products.filter(pro => pro.id !== id)
    products ? response.status(204).end() : response.json({
        'Error': 'Hubo un error en el consumo de api'
    })
})

//Crea un nuevo producto
app.post('/api/products', (request, response) => {
    let produ = request.body

    let ids = products.map(pro => pro.id)
    let maxId = Math.max(...ids)

    let newProduct = {
        id: maxId + 1,
        title: produ.title,
        price: produ.price,
        img: produ.img
    }

    console.log(newProduct)
    products = [...products,newProduct]
    // products = products.concat(newProduct)
    response.json(newProduct)
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server runing on port ${PORT}`)
})