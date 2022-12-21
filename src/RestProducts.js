const Product = require('./model/ModelProduct')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 19/12/2022
*/

//Lista los productos
const ListProduct = (res) => {
    Product.find().then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(404).json({ 'Error': 'Hubo un error en el consumo de api', 'ErrorMongo': err }).end()
    })
}

//Busca producto por id
const FindProduct = (res, id) => {
    Product.findById(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'No se ha encontrado el producto o hubo un error', 'ErrorMongo': err }).end()
    })
}

//Elimina un producto por id
const DeleteProduct = (res, id) => {
    Product.findByIdAndRemove(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'No se ha encontrado el producto o hubo un error', 'ErrorMongo': err }).end()
    })
}

//Crea un nuevo producto
const NewProduct = (res, body) => {
    if (!body || !body.title || !body.price || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        //En español el title price img
        return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
    }
    if (typeof body.price !== 'number') {
        return res.status(400).json({ error: 'El precio debe ser un number' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
    }

    const newProduct = new Product({
        title: body.title,
        price: body.price,
        img: body.img
    })

    newProduct.save()
        .then(result => {
            res.json(result).end()
        }).catch(err => {
            res.status(400).json({Error: err }).end()
        })
}

//Modifica un producto completo por id
const ModProduct = (res, id, body) => {
    if (!body || !body.title || !body.price || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
    }
    if (typeof body.price !== 'number') {
        return res.status(400).json({ error: 'El precio debe ser un number' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
    }

    Product.findByIdAndUpdate(id, body, {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro un producto para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}
//Modifica parte de un producto por id
const ModOneProduct = (res, id, body) => {
    if (!body) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (body.title) {
        if (typeof body.title !== 'string') {
            return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
        }
    }
    if (body.price) {
        if (typeof body.price !== 'number') {
            return res.status(400).json({ error: 'El precio debe ser un number' }).end()
        }
    }
    if (body.img) {
        if (typeof body.img !== 'string') {
            return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
        }
    }
    
    Product.findByIdAndUpdate(id,{$set: body} , {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro un producto para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}

module.exports = {ListProduct, FindProduct, DeleteProduct, NewProduct, ModProduct, ModOneProduct}