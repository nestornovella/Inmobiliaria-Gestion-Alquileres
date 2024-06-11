const { Router } = require('express')
const { getAllRents, createRent, editRent, getOneRent, deleteRent } = require('../controllers/rent')



const router = Router()

router.get('/', getAllRents)
router.get('/:id', getOneRent)
router.post('/', createRent)
router.put('/:id', editRent)
router.delete('/:id', deleteRent)
 


module.exports = router