const { Property, Lessor } = require('../DB/db')
const { errorHandler, resHandler } = require('../helpers/responseHandler')
const { httpStatusCode } = require('../helpers/httpStatusCode')


module.exports = {
    getAllProperties: async (req, res, next) => {
        try {
            const properties = await Property.findAll()
            resHandler(httpStatusCode.aceptado, properties)
        } catch (error) {
            next(error)
        }
    },

    getOneProperty: async (req, res, next) => {
        const { id } = req.params

        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se necesita id error/line:20 property.js')
            const property = await Property.findByPk(id, {
                include:
                    [
                        {
                            model: Lessor,
                            attributes: {exclude:['createdAt', 'updatedAt']}
                        }
                    ]
            })
            if (!property) errorHandler(httpStatusCode.noEncontrado, 'no se encontro el usuario error/line:20 property.js')
            resHandler(httpStatusCode.aceptado, property)
        } catch (error) {
            next(error)
        }
    },
    createProperty: async (req, res, next) => {
        const { email } = req.body
        try {
            const property = await Property.create(req.body)
            const lessor = await Lessor.findByPk(email)
            if (!lessor) errorHandler(httpStatusCode.badRequest, 'se requiere el email del locador')
            if (!property) errorHandler(httpStatusCode.badRequest, 'se requeria parametros o hubo un error interno')
            lessor.addProperty(property)
            resHandler(httpStatusCode.aceptado, property)
        } catch (error) {
            next(error)
        }
    },
    editProperty: async (req, res, next) => {
        const { id } = req.params

        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se necesita id error/line:20 property.js')
            const property = await Property.findByPk(id)
            if (!property) errorHandler(httpStatusCode.noEncontrado, 'no se encontro el usuario error/line:20 property.js')
            const updatedProperty = property.update(req.body)
            if (!updatedProperty) errorHandler(httpStatusCode.noAutorizado, 'no se pudo actualizar la propiedad error/line:24 property.js')
            resHandler(httpStatusCode.aceptado, updatedProperty)

        } catch (error) {
            next(error)
        }
    },
    deleteProperty: async (req, res, next) => {
        const { id } = req.params

        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se necesita id error/line:34 property.js')
            const property = await Property.findByPk(id)
            if (!property) errorHandler(httpStatusCode.noEncontrado, 'no se encontro el usuario error/line:36 property.js')
            const deletedProperty = property.destroy()
            if (!deletedProperty) errorHandler(httpStatusCode.conflictivo, 'no se pudo eliminar la propiedad error/line:39 property.js')
            resHandler(httpStatusCode.aceptado, 'propiedad eliminada')

        } catch (error) {
            next(error)
        }
    }
}