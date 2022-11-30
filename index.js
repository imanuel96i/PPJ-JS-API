const express = require('express')
const { ListProduct, FindProduct, DeleteProduct, NewProduct } = require('./src/RestProducts')

const app = express()
const logger = require('./logger')

app.use(express.json())

app.use(logger)

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


app.use((request, response) => {
    response.status(404).json({
        error: 'Not Found'
    })
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server runing on port ${PORT}`)
})