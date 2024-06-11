const { httpStatusCode } = require("../helpers/httpStatusCode")
const { errorHandler, resHandler } = require("../helpers/responseHandler")
const {Lessor} = require('../DB/db')


module.exports = {
    getAllLessor: async (req, res, next)=>{
        try {
            const lessorList = await Lessor.findAll()
            resHandler(httpStatusCode.aceptado, lessorList)
        } catch (error) {
            next(error)
        }
    },
    createLessor: async(req, res, next) =>{
        const {fullName, email} = req.body
        try {
            const emailVerify =await Lessor.findOne({where:{email:email}})
            if(emailVerify)errorHandler(httpStatusCode.conflictivo, 'existe locador con ese email error/linea:19 lessor.js')
            const lessor = await Lessor.create(req.body)
            if(!lessor)errorHandler(httpStatusCode.conflictivo, 'no se pudo crear el locador error/linea:21 lessor.js')
            resHandler(httpStatusCode.creado, lessor)
            
        } catch (error) {
            next(error)
        }
    },
    editLessor:async (req, res, next)=>{
        const { email } = req.params
        try {
            if(!email)errorHandler(httpStatusCode.badRequest, 'se requiere el email error/linea:31 lessor.js')
            const lessor = await Lessor.findByPk(email)
            if(!lessor) errorHandler(httpStatusCode.noEncontrado, 'el locador no fueencontrado error/linea:33 lessor.js')
            await lessor.update(req.body)
            resHandler(httpStatusCode.actualizado, lessor)
        } catch (error) {
            next(error)
        }
    },
    deleteLessor:async (req, res, next)=>{
        const { email } = req.params
        try {
            if(!email)errorHandler(httpStatusCode.badRequest, 'se requiere el email error/linea:31 lessor.js')
            const lessor = await Lessor.findByPk(email)
            if(!lessor) errorHandler(httpStatusCode.noEncontrado, 'el locador no fue encontrado error/linea:33 lessor.js')
            await lessor.destroy()
            resHandler(httpStatusCode.actualizado, lessor)
        } catch (error) {
            next(error)
        }
    }
}