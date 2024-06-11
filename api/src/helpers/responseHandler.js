const { sendCaptured } = require("./resCapture");



function resHandler(status, response) {
    const { req, res, next } = sendCaptured()
    if (typeof response == 'string') {
        res.status(status).json({ status, response: response })
    } else {
        res.status(status).json({ status, data: response })
    }
}

function errorHandler(status, message){
    const error = new Error(message)
    error.status = status
    throw error
}   

function errorMidleWare(err, req, res, next) {
    const status = err.status || 500
    const message = err.message || err
    res.status(status).json({ status, error: message })
}

module.exports = {
    resHandler, errorHandler, errorMidleWare
}