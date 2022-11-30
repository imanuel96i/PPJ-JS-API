let { categories } = require('./data')

//Listar categorias
const ListCategories = (res) => {
    categories ? res.json(categories) : res.status(404).json({'Error': 'Hubo un error en el consumo de api'}).end()
}

//Buscar categoria por id
const FindCategorie = (res, id) => {
    const categorie = categories.find(pro => pro.id === id)
    categorie ? res.json(categorie) : res.status(400).json({'Error': 'No se ha encontrado la categoria o hubo un error'}).end()
}

//Eliminar categoria por id
const DeleteCategorie = (res, id) => {
    const categorie = categories.find(pro => pro.id === id)
    if (categorie) {
        categories = categories.filter(pro => pro.id !== id)
        res.status(200).json({ 'Mensaje': 'Se ha eliminado la categoria' })
    } else {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación de la categoria' }).end()
    }
}

//Crear nueva categoria
const NewCategorie = (res, body) => {
    if (!body || !body.title || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    if (typeof body.title !== 'string') {
        return res.status(400).json({ error: 'El title debe ser un string' }).end()
    }
    if (typeof body.img !== 'string') {
        return res.status(400).json({ error: 'El img debe ser un string' }).end()
    }
    
    let ids = categories.map(pro => pro.id)
    let maxId = Math.max(...ids)

    let newCategorie = {
        id: maxId + 1,
        title: body.title,
        img: body.img
    }

    categories = [...categories,newCategorie]
    res.json(newCategorie)
}

module.exports = { ListCategories, FindCategorie, DeleteCategorie, NewCategorie}