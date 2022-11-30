const express = require('express')
const { ListProduct, FindProduct, DeleteProduct, NewProduct } = require('./src/RestProducts')
const { ListCategories, FindCategorie, DeleteCategorie, NewCategorie} = require('./src/RestCategories')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 30/11/2022
*/

const app = express()
const logger = require('./logger')

app.use(express.json())

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

//!Api Buscar
//Buscar producto por id
app.get('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    FindProduct(response, id)
})

//Buscar categoria por id
app.get('/api/categories/:id', (request, response) => {
    const id = parseInt(request.params.id)
    FindCategorie(response, id)
})

//!Api Eliminar
//Eliminar productos por id
app.delete('/api/products/:id', (request, response) => {
    const id = parseInt(request.params.id)
    DeleteProduct(response,id)
})

//Eliminar categorias por id
app.delete('/api/categories/:id', (request, response) => {
    const id = parseInt(request.params.id)
    DeleteCategorie(response,id)
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

//Muestra error al entrar a un path no existente
app.use((request, response) => {
    response.status(404).json({
        error: 'Not Found'
    })
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server runing on port ${PORT}`)
})