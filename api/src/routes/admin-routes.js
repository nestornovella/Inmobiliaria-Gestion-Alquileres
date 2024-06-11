const { Router } = require('express')
const { createAdmin, getAllAdmins, editAdmin, deleteAdmin } = require('../controllers/admin')


const router = Router()

router.get('/', getAllAdmins)
router.post('/', createAdmin)
router.put('/:email', editAdmin)
router.delete('/:email', deleteAdmin)


module.exports = router