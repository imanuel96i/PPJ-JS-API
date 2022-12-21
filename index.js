const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { ListProduct, FindProduct, DeleteProduct, NewProduct, ModProduct, ModOneProduct} = require('./src/RestProducts')
const { ListCategories, FindCategorie, DeleteCategorie, NewCategorie, ModCategorie, ModOneCategorie } = require('./src/RestCategories')
const { ListSlider, FindSlider, DeleteSlider, NewSlider, ModSlider, ModOneSlider } = require('./src/RestSliderProducts')
const mongoose = require('mongoose')
const logger = require('./logger')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 14/12/2022
*/
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB)
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.error(err)
    })

const app = express()

app.use(express.json())
app.use(cors())

//Muestra por consola el consumo de la Api
app.use(logger)

//Pagina inicial Api
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

//!Api Listas
//Listar productos
app.get('/api/products', (request, response) => {
    ListProduct(response)
})

//Listar categorias
app.get('/api/categories', (request, response) => {
    ListCategories(response)
})

//Listar productos del slider
app.get('/api/slider', (request, response) => {
    ListSlider(response)
})

//!Api Buscar
//Buscar producto por id
app.get('/api/products/:id', (request, response) => {
    const id = request.params.id
    FindProduct(response, id)
})

//Buscar categoria por id
app.get('/api/categories/:id', (request, response) => {
    const id = request.params.id
    FindCategorie(response, id)
})

//Buscar producto del slider por id
app.get('/api/slider/:id', (request, response) => {
    const id = request.params.id
    FindSlider(response, id)
})

//!Api Eliminar
//Eliminar productos por id
app.delete('/api/products/:id', (request, response) => {
    const id = request.params.id
    DeleteProduct(response,id)
})

//Eliminar categorias por id
app.delete('/api/categories/:id', (request, response) => {
    const id = request.params.id
    DeleteCategorie(response,id)
})

//Eliminar producto del slider por id
app.delete('/api/slider/:id', (request, response) => {
    const id = request.params.id
    DeleteSlider(response,id)
})

//!Api Creación
//Crea un nuevo producto
app.post('/api/products', (request, response) => {
    const produ = request.body
    NewProduct(response, produ)
})

//Crea una nueva categoria
app.post('/api/categories', (request, response) => {
    const cate = request.body
    NewCategorie(response, cate)
})

//Añade un producto al slider 
app.post('/api/slider', (request, response) => {
    const sli = request.body
    NewSlider(response, sli)
})

//!Api Modificación
//Modifica un producto
app.put('/api/products/:id', (request, response) => {
    const id = request.params.id
    const pro = request.body
    ModProduct(response, id, pro)
})

//Modifica una parte del producto
app.patch('/api/products/:id', (request, response) => {
    const id = request.params.id
    const pro = request.body
    ModOneProduct(response, id, pro)
})

//Modifica un producto del slider
app.put('/api/slider/:id', (request, response) => {
    const id = request.params.id
    const pro = request.body
    ModSlider(response, id, pro)
})

//Modifica una parte de un producto del slider
app.patch('/api/slider/:id', (request, response) => {
    const id = request.params.id
    const cat = request.body
    ModOneSlider(response, id, cat)
})

//Modifica una categoria
app.put('/api/categories/:id', (request, response) => {
    const id = request.params.id
    const cat = request.body
    ModCategorie(response, id, cat)
})

//Modifica una parte de la categoria
app.patch('/api/categories/:id', (request, response) => {
    const id = request.params.id
    const cat = request.body
    ModOneCategorie(response, id, cat)
})

//!Api path no existente
//Muestra error al entrar a un path no existente
app.use((request, response) => {
    response.status(404).json({
        error: 'Not Found'
    }).end()
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server runing on port ${process.env.PORT}`)
})