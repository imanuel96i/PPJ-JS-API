const Categorie = require('./model/ModelCategorie')

/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 29/11/2022
 * Fecha ultima modificación: 19/12/2022
*/

//Listar categorias
const ListCategories = (res) => {
    Categorie.find().then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(404).json({ 'Error': 'Hubo un error en el consumo de api', 'ErrorMongo': err }).end()
    })
}

//Buscar categoria por id
const FindCategorie = (res, id) => {
    Categorie.findById(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'No se ha encontrado la categoria o hubo un error', 'ErrorMongo': err }).end()
    })
}

//Eliminar categoria por id
const DeleteCategorie = (res, id) => {
    Categorie.findByIdAndRemove(id).then(result => {
        res.json(result).end()
    }).catch(err => {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación de la categoria', 'ErrorMongo': err }).end()
    })
}

//Crear nueva categoria
const NewCategorie = (res, body) => {
    if (!body || !body.title || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
    }

    const newCategorie = new Categorie({
        title: body.title,
        price: body.price,
        img: body.img
    })

    newCategorie.save()
        .then(result => {
            res.json(result).end()
        }).catch(err => {
            res.status(400).json({Error: err }).end()
        })
}

//Modifica una categoria por id
const ModCategorie = (res, id, body) => {
    if (!body || !body.title || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
    }

    Categorie.findByIdAndUpdate(id, body, {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro una categoria para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}

//Modifica parte de una categoria por id
const ModOneCategorie = (res, id, body) => {
    if (!body) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (body.title) {
        if (typeof body.title !== 'string') {
            return res.status(400).json({ error: 'El titulo debe ser un string' }).end()
        }
    }
    if (body.img) {
        if (typeof body.img !== 'string') {
            return res.status(400).json({ error: 'La imagen debe ser un string' }).end()
        }
    }
    
    Categorie.findByIdAndUpdate(id,{$set: body} , {new: true}).then(result => {
        res.json(result).end()
    }).catch(err => {
        return res.status(400).json({ Error: 'No se encontro una categoria para modificar u ocurrio un error inesperado', ErrorMongo: err }).end()
    })
}

module.exports = { ListCategories, FindCategorie, DeleteCategorie, NewCategorie, ModCategorie, ModOneCategorie}