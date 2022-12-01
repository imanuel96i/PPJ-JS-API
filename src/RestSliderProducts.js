let { productsSlider } = require('./data')

//Lista los productos del slider
const ListSlider = (res) => {
    productsSlider ? res.json(productsSlider) : res.status(404).json({'Error': 'Hubo un error en el consumo de api'}).end()
}

//Busca un producto del slider por id
const FindSlider = (res, id) => {
    const slider = productsSlider.find(pro => pro.id === id)
    slider ? res.json(slider) : res.status(400).json({'Error': 'No se ha encontrado el producto del slider o hubo un error'}).end()
}

//Elimina un producto del slider por id
const DeleteSlider = (res, id) => {
    const slider = productsSlider.find(pro => pro.id === id)
    if (slider) {
        productsSlider = productsSlider.filter(pro => pro.id !== id)
        res.status(200).json({ 'Mensaje': 'Se ha eliminado el producto del slider' }).end()
    } else {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación del producto en el slider' }).end()
    }
}

//Añade un producto al slider
const NewSlider = (res, body) => {
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

    let ids = productsSlider.map(pro => pro.id)
    let maxId
    
    ids.length === 0 ? maxId = 0 : maxId = Math.max(...ids)

    let newSlider = {
        id: maxId + 1,
        title: body.title,
        price: body.price,
        img: body.img
    }

    productsSlider = [...productsSlider,newSlider]
    res.json(newSlider)
}

//Modifica un producto del slider por id
const ModSlider = (res, id, body) => {
    const prosli = productsSlider.find(pro => pro.id === id)
    if (prosli) {
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

        prosli.title = body.title
        prosli.price = body.price
        prosli.img = body.img
        res.json(prosli).end()
    } else {
        return res.status(400).json({ error: 'No se encontro un producto para modificar u ocurrio un error inesperado' }).end()
    }
}

module.exports = { ListSlider, FindSlider, DeleteSlider, NewSlider, ModSlider}