let { products } = require('../data')

const ListProduct = (res) => {
    products ? res.json(products) : res.status(404).json({'Error': 'Hubo un error en el consumo de api'}).end()
}

const FindProduct = (res, id) => {
    const product = products.find(pro => pro.id === id)
    product ? res.json(product) : res.status(400).json({'Error': 'No se ha encontrado el producto o hubo un error'}).end()
}

const DeleteProduct = (res, id) => {
    const product = products.find(pro => pro.id === id)
    if (product) {
        products = products.filter(pro => pro.id !== id)
        res.status(200).json({ 'Mensaje': 'Se ha eliminado el producto' })
    } else {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación del producto' }).end()
    }
}

const NewProduct = (res, body) => {
    if (!body || !body.title || !body.price || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    
    let ids = products.map(pro => pro.id)
    let maxId = Math.max(...ids)

    let newProduct = {
        id: maxId + 1,
        title: body.title,
        price: body.price,
        img: body.img
    }

    products = [...products,newProduct]
    res.json(newProduct)
}

module.exports = {ListProduct, FindProduct, DeleteProduct, NewProduct}