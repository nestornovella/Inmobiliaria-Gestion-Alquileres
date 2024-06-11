const { Rent, Property, Tanant, Lessor, Payment } = require('../DB/db')
const { resHandler, errorHandler } = require('../helpers/responseHandler')
const { httpStatusCode } = require('../helpers/httpStatusCode')


module.exports = {
    getAllRents: async (req, res, next) => {
        try {
            const rents = await Rent.findAll()
            resHandler(httpStatusCode.aceptado, rents)
        } catch (error) {
            next(error)
        }
    },
    getOneRent: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'falta el id de la renta')
            const rent = await Rent.findByPk(id, {
                include:
                    [
                        {
                            model: Lessor,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: Tanant,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: Property,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: Payment,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }

                    ]
            })
            if (!rent) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la renta en la base de datos')
            resHandler(httpStatusCode.aceptado, rent)
        } catch (error) {
            next(error)
        }
    },
    createRent: async (req, res, next) => {
        const { type, lessorEmail, tanantEmail, propertyId } = req.body
        try {
            const rent = await Rent.create(req.body)
            const lessor = await Lessor.findByPk(lessorEmail)
            const tanant = await Tanant.findByPk(tanantEmail)
            const property = await Property.findByPk(propertyId)
            if (!lessor || !tanant || !property) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la propiedad, el locador o el locatario')
            if (!rent) errorHandler(httpStatusCode.badRequest, 'no se pudo crear la renta')
            if (!type) errorHandler(httpStatusCode.badRequest, 'se requiere el parametro type este puede ser: departamento, casa, local, galpon, terreno, deposito, franquicia, otro')

            await lessor.addRent(rent)
            await tanant.addRent(rent)
            await property.addRent(rent)

            resHandler(httpStatusCode.aceptado, rent)
        } catch (error) {
            next(error)
        }
    },
    editRent: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se requiere el id de la renta')
            const rent = await Rent.findByPk(id)
            if (!rent) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la renta en la base de datos')
            const updated = await Rent.update(req.body)
            if (!updated) errorHandler(httpStatusCode.conflictivo, 'no se pudo actializar la renta')
            resHandler(httpStatusCode.actualizado, updated)
        } catch (error) {
            next(error)
        }
    },
    deleteRent: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se requiere el id de la renta')
            const rent = await Rent.findByPk(id)
            if (!rent) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la renta en la base de datos')
            const deleted = await rent.destroy()
            if (!deleted) errorHandler(httpStatusCode.conflictivo, 'no se pudo eliminar la renta')
            resHandler(httpStatusCode.actualizado, 'se elimino el pago')
        } catch (error) {
            next(error)
        }
    }
}