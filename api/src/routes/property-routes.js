const { Router } = require('express')
const { getAllProperties, getOneProperty, createProperty, editProperty, deleteProperty } = require('../controllers/property')



const router = Router()

router.get('/', getAllProperties)
router.get('/:id', getOneProperty)
router.post('/', createProperty)
router.put('/:id', editProperty)
router.delete('/:id', deleteProperty)



module.exports = router