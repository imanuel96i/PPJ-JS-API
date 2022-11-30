let { productsSlider } = require('./data')

//Lista los productos del slider
const ListSlider = (res) => {
    productsSlider ? res.json(productsSlider) : res.status(404).json({'Error': 'Hubo un error en el consumo de api'}).end()
}

//Busca un producto del slider por id
const FindSlider = (res, id) => {
    const slider = productsSlider.find(pro => pro.id === id)
    slider ? res.json(slider) : res.status(400).json({'Error': 'No se ha encontrado la categoria o hubo un error'}).end()
}

//Elimina un producto del slider por id
const DeleteSlider = (res, id) => {
    const slider = productsSlider.find(pro => pro.id === id)
    if (slider) {
        productsSlider = productsSlider.filter(pro => pro.id !== id)
        res.status(200).json({ 'Mensaje': 'Se ha eliminado la categoria' })
    } else {
        res.status(400).json({ 'Error': 'Hubo un error en la eliminación de la categoria' }).end()
    }
}

//Añade un producto al slider
const NewSlider = (res, body) => {
    if (!body || !body.title || !body.img) {
        return res.status(400).json({ error: 'Ocurrio un problema, faltan datos o existe un problema en la api' }).end()
    }
    
    let ids = productsSlider.map(pro => pro.id)
    let maxId = Math.max(...ids)

    let newSlider = {
        id: maxId + 1,
        title: body.title,
        img: body.img
    }

    productsSlider = [...productsSlider,newSlider]
    res.json(newSlider)
}

module.exports = { ListSlider, FindSlider, DeleteSlider, NewSlider}