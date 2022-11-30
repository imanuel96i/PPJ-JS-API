const logger = (request, response, next) => {
    console.log(request.method, request.path, request.body, response.statusCode)
    next()
}

module.exports = logger