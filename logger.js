/*
 * @author Manuel Vidal García
 * Contacto: mvidal@acl.cl
 * Fecha creación: 30/11/2022
 * Fecha ultima modificación: 30/11/2022
*/

const logger = (request, response, next) => {
    console.log(request.method, request.path, request.body, response.statusCode)
    next()
}

module.exports = logger