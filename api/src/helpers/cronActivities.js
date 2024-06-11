const { Op } = require('sequelize')
const { Admin, Lessor, Payment, Office, Property, Rent, Tanant } = require('../DB/db')
const cron = require('node-cron')
const payment = require('../controllers/payment')



function startcron() {

    cron.schedule('0 9 15 * *', () => {
        console.log('se ejecuta cron')
    })

    //genera las ordenes de pagos cada mes
    // min  hour  day  month   year   if you not insert anything repeat   
    // *    *     *    *       *    
    cron.schedule('0 9 15 * *', async () => {
        console.log('generando rentas')
        const date = new Date()
        try {
            const allRents = await Rent.findAll({
                where: {
                    expiration: {
                        [Op.gt]: date
                    }
                },
                include: [
                    {model:Property}
                ]

            })

            allRents.forEach(async (rent) => {

                const payment = await Payment.create({ amount: rent.price, rentId: rent.id, commision: (rent.price * 5) / 100 })
                rent.addPayment(payment)
                console.log(`renta de ${rent.Property ? rent.Property.address : 'propiedad no asociada' } del mes de ${payment.month} generada...`)
            })
            console.log('se generaron todas las rentas correspondientes al mes...')
        } catch (error) {
            console.log(error)
        }
    })

}


module.exports = { startcron }
