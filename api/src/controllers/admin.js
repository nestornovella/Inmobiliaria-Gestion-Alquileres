const { Admin } = require('../DB/db')
const { httpStatusCode } = require('../helpers/httpStatusCode')
const { resHandler, errorHandler } = require('../helpers/responseHandler')

module.exports = {
    createAdmin: async (req, res, next) => {

        try {
            const admin = await Admin.create(req.body)
            if (!admin) errorHandler(httpStatusCode.badRequest)
            resHandler(httpStatusCode.creado, admin)
        } catch (error) {
            next(error)
        }

    },
    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.findAll()
            resHandler(httpStatusCode.aceptado, admins)
        } catch (error) {

        }
    },
    editAdmin: async (req, res, next) => {
        const { email } = req.params
        try {
            if (!email) errorHandler(httpStatusCode.badRequest, 'el email es requerido por parametro error/linea:28 admin.js')
            const admin = await Admin.findByPk(email)
            if (!admin) errorHandler(httpStatusCode.noEncontrado, 'el administrador no fue encontrado error/linea:30 admin.js')
            const updated = await admin.update(req.body)
            if (!updated) errorHandler(httpStatusCode.conflictivo, 'no se pudo actualizar error/linea:32 admin.js')
            resHandler(httpStatusCode.actualizado, updated)
        } catch (error) {
            next(error)
        }
    },
    deleteAdmin:async (req, res, next)=>{
        const {email}= req.params
        try {
            if (!email) errorHandler(httpStatusCode.badRequest, 'el email es requerido por parametro error/linea:41 admin.js')
                const admin = await Admin.findByPk(email)
                if (!admin) errorHandler(httpStatusCode.noEncontrado, 'el administrador no fue encontrado error/linea:43 admin.js')
                const deleted = await admin.destroy()
                if (!deleted) errorHandler(httpStatusCode.conflictivo, 'no se pudo eliminar error/linea:45 admin.js')
                resHandler(httpStatusCode.actualizado, 'administrador eliminado')
        } catch (error) {
            next(error)
        }
    } 

}