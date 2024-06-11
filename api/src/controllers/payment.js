const { Rent, Property, Tanant, Lessor, Payment } = require('../DB/db')
const { resHandler, errorHandler } = require('../helpers/responseHandler')
const { httpStatusCode } = require('../helpers/httpStatusCode')


module.exports = {
    getAllPyments: async (req, res, next) => {
        try {
            const payment = await Payment.findAll()
            resHandler(httpStatusCode.aceptado, payment)
        } catch (error) {
            next(error)
        }
    },
    getOnePyment: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'falta el id de el pago')
            const payment = await Payment.findByPk(id, {
                include:
                    [
                        {
                            model: Rent,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                    ]
            })
            if (!payment) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la orden de pago en la base de datos')
            resHandler(httpStatusCode.aceptado, payment)
        } catch (error) {
            next(error)
        }
    },
    createPayment: async (req, res, next) => {
        const { rentId } = req.body
        try {
            const payment = await Payment.create(req.body)
            const rent = await Rent.findByPk(rentId)
            if (!rent) errorHandler(httpStatusCode.noEncontrado, 'no se encontro la renta')
            if (!payment) errorHandler(httpStatusCode.badRequest, 'no se pudo crear el pago')

            await rent.addPayment(payment)

            resHandler(httpStatusCode.aceptado, payment)
        } catch (error) {
            next(error)
        }
    },
    editPayment: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se requiere el id de la orden de pago')
            const payment = await Payment.findByPk(id)
            if (!payment) errorHandler(httpStatusCode.noEncontrado, 'no se encontro el pago en la base de datos')
            const updated = await payment.update(req.body)
            if (!updated) errorHandler(httpStatusCode.conflictivo, 'no se pudo actializar el pago')
            resHandler(httpStatusCode.actualizado, updated)
        } catch (error) {
            next(error)
        }
    },
    deletePayment: async (req, res, next) => {
        const { id } = req.params
        try {
            if (!id) errorHandler(httpStatusCode.badRequest, 'se requiere el id de la orden de pago')
            const payment = await Payment.findByPk(id)
            if (!payment) errorHandler(httpStatusCode.noEncontrado, 'no se encontro el pago en la base de datos')
            const deleted = await payment.destroy()
            if (!deleted) errorHandler(httpStatusCode.conflictivo, 'no se pudo eliminar el pago')
            resHandler(httpStatusCode.actualizado, 'se elimino el pago')
        } catch (error) {
            next(error)
        }
    }
}