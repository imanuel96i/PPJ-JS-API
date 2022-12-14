const Slider = require('./model/ModelSlider')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 14/12/2022
*/

//Lista los productos del slider
const ListSlider = (res) => {
    Slider.find().then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(404).json({ 'Error': 'Hubo un error en el consumo de api', 'ErrorMongo': err }).end()
    })
}

//Busca un producto del slider por id
const FindSlider = (res, id) => {
    Slider.findById(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'No se ha encontrado el producto del slider o hubo un error', 'ErrorMongo': err }).end()
    })
}

//Elimina un producto del slider por id
const DeleteSlider = (res, id) => {
    Slider.findByIdAndRemove(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación del producto en el slider', 'ErrorMongo': err }).end()
    })
}

//Añade un producto al slider
const NewSlider = (res, body) => {
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

    const newSlider = new Slider({
        title: body.title,
        price: body.price,
        img: body.img
    })

    newSlider.save()
        .then(result => {
            res.json(result).end()
        }).catch(err => {
            res.status(400).json({Error: err }).end()
        })
}

//Modifica un producto del slider por id
const ModSlider = (res, id, body) => {
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

    Slider.findByIdAndUpdate(id, body, {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro un producto para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}

//Modifica parte de un producto del slider por id
const ModOneSlider = (res, id, body) => {
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
    
    Slider.findByIdAndUpdate(id,{$set: body} , {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro un producto para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}

module.exports = { ListSlider, FindSlider, DeleteSlider, NewSlider, ModSlider, ModOneSlider}