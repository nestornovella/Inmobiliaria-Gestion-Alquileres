const { Router } = require('express')
const { getAllPyments, getOnePyment, createPayment, editPayment, deletePayment } = require('../controllers/payment')



const router = Router()

router.get('/', getAllPyments)
router.get('/:id', getOnePyment)
router.post('/', createPayment)
router.put('/:id', editPayment)
router.delete('/:id', deletePayment)
 


module.exports = router