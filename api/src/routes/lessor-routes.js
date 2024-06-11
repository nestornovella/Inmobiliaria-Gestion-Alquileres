const { Router } = require('express')
const { createLessor, getAllLessor, editLessor, deleteLessor, getOneLessor } = require('../controllers/lessor')


const router = Router()

router.get('/', getAllLessor)
router.get('/:email', getOneLessor)
router.post('/', createLessor)
router.put('/:email', editLessor)
router.delete('/:email', deleteLessor)



module.exports = router