const { Router } = require('express')
const { getAllTanant, createTanant, editTanant, deleteTanant } = require('../controllers/tanat')



const router = Router()

router.get('/', getAllTanant)
router.post('/', createTanant)
router.put('/:email', editTanant)
router.delete('/:email', deleteTanant)



module.exports = router