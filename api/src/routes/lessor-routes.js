const { Router } = require('express')
const { createLessor, getAllLessor, editLessor, deleteLessor } = require('../controllers/lessor')


const router = Router()

router.get('/', getAllLessor)
router.post('/', createLessor)
router.put('/:email', editLessor)
router.delete('/:email', deleteLessor)



module.exports = router