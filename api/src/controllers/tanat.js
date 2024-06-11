const { httpStatusCode } = require("../helpers/httpStatusCode")
const { errorHandler, resHandler } = require("../helpers/responseHandler")
const {Tanant} = require('../DB/db')


module.exports = {
    getAllTanant: async (req, res, next)=>{
        try {
            const tanantList = await Tanant.findAll()
            resHandler(httpStatusCode.aceptado, tanantList)
        } catch (error) {
            next(error)
        }
    },
    createTanant: async(req, res, next) =>{
        const {fullName, email} = req.body
        try {
            const emailVerify =await Tanant.findOne({where:{email:email}})
            if(emailVerify)errorHandler(httpStatusCode.conflictivo, 'existe locatario con ese email error/linea:19 tanant.js')
            const tanant = await Tanant.create(req.body)
            if(!tanant)errorHandler(httpStatusCode.conflictivo, 'no se pudo crear el locatario error/linea:21 tanant.js')
            resHandler(httpStatusCode.creado, tanant)
            
        } catch (error) {
            next(error)
        }
    },
    editTanant:async (req, res, next)=>{
        const { email } = req.params
        try {
            if(!email)errorHandler(httpStatusCode.badRequest, 'se requiere el email error/linea:31 tanant.js')
            const tanant = await Tanant.findByPk(email)
            if(!tanant) errorHandler(httpStatusCode.noEncontrado, 'el locatario no fue encontrado error/linea:33 tanant.js')
            await tanant.update(req.body)
            resHandler(httpStatusCode.actualizado, tanant)
        } catch (error) {
            next(error)
        }
    },
    deleteTanant:async (req, res, next)=>{
        const { email } = req.params
        try {
            if(!email)errorHandler(httpStatusCode.badRequest, 'se requiere el email error/linea:31 tanant.js')
            const tanant = await Tanant.findByPk(email)
            if(!tanant) errorHandler(httpStatusCode.noEncontrado, 'el locador no fueencontrado error/linea:33 tanant.js')
            await tanant.destroy()
            resHandler(httpStatusCode.actualizado, tanant)
        } catch (error) {
            next(error)
        }
    }
}