let { products } = require('./data')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 01/12/2022
*/

//Lista los productos
const ListProduct = (res) => {
    products ? res.json(products).end() : res.status(404).json({'Error': 'Hubo un error en el consumo de api'}).end()
}

//Busca producto por id
const FindProduct = (res, id) => {
    const product = products.find(pro => pro.id === id)
    product ? res.json(product).end() : res.status(400).json({'Error': 'No se ha encontrado el producto o hubo un error'}).end()
}

//Elimina un producto por id
const DeleteProduct = (res, id) => {
    const product = products.find(pro => pro.id === id)
    if (product) {
        products = products.filter(pro => pro.id !== id)
        res.status(200).json({ 'Mensaje': 'Se ha eliminado el producto' })
    } else {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación del producto' }).end()
    }
}

//Crea un nuevo producto
const NewProduct = (res, body) => {
    if (!body || !body.title || !body.price || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        return res.status(400).json({ error: 'El title debe ser un string' }).end()
    }
    if (typeof body.price !== 'number') {
        return res.status(400).json({ error: 'El price debe ser un number' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'El img debe ser un string' }).end()
    }

    let maxId
    let ids = products.map(pro => pro.id)

    ids.length === 0 ? maxId = 0 : maxId = Math.max(...ids)
    
    let newProduct = {
        id: maxId + 1,
        title: body.title,
        price: body.price,
        img: body.img
    }

    products = [...products,newProduct]
    res.json(newProduct).end()
}

//Modifica un producto por id
const ModProduct = (res, id, body) => {
    const mdpro = products.find(pro => pro.id === id)
    if (mdpro) {
        if (!body || !body.title || !body.price || !body.img) {
            return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
        }
        if (typeof body.title !== 'string') {
            return res.status(400).json({ error: 'El title debe ser un string' }).end()
        }
        if (typeof body.price !== 'number') {
            return res.status(400).json({ error: 'El price debe ser un number' }).end()
        }
        if (typeof body.img !== 'string') {
            return res.status(400).json({ error: 'El img debe ser un string' }).end()
        }

        mdpro.title = body.title
        mdpro.price = body.price
        mdpro.img = body.img
        res.json(mdpro).end()
    } else {
        return res.status(400).json({ error: 'No se encontro un producto para modificar u ocurrio un error inesperado' }).end()
    }
}

module.exports = {ListProduct, FindProduct, DeleteProduct, NewProduct, ModProduct}