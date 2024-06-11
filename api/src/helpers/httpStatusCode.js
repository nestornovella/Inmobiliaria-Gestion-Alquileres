

const httpStatusCode = {
    aceptado: 202,
    actualizado: 200,
    creado: 201,
    eliminado: 204,
    sinContenido: 204,
    badRequest: 400,
    noAutorizado: 401,
    prohibido: 403,
    noEncontrado: 404,
    métodoNoPermitido: 405,
    tiempoEspera: 408,
    conflictivo: 409,
    longitudRequerida: 411,
    entidadNoProcesable: 422,
    errorServidor: 500,
    noImplementado: 501,
    servicioNoDisponible: 503,
    versionHTTPNoSoportada: 505,
  }

  module.exports = {httpStatusCode}

  