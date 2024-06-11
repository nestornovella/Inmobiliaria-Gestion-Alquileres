const {Router} = require('express')
const adminRoutes = require('./admin-routes')
const lessorRoutes = require('./lessor-routes')
const tanantRoutes = require('./tanat-routes')
const propertyRoutes = require('./property-routes')
const rentRoutes = require('./rent-routes')
const paymentRoutes = require('./payment-routes')

const router = Router()

router.use('/admin', adminRoutes)
router.use('/lessor', lessorRoutes)
router.use('/tanant', tanantRoutes)
router.use('/property', propertyRoutes)
router.use('/rent', rentRoutes)
router.use('/payment', paymentRoutes)

module.exports = router