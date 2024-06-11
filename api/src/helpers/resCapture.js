
let globalRes = {req:null, res:null, next:null}

function resCapture(req, res, next){
    globalRes = {req, res, next}
    next()
}

function sendCaptured(){
    return globalRes
}

module.exports = {
    resCapture,
    sendCaptured
}