const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const server = require('./server')
const router = require('./src/routes/index-routes')
const { resCapture } = require('./src/helpers/resCapture')
const { errorMidleWare } = require('./src/helpers/responseHandler')
const cron = require('node-cron')
const moment = require('moment-timezone')


const app = express()

console.log(new Date().getHours())

//trabajar esta parte!
cron.schedule('20 20 * * *',()=>{
    console.log('se ejecuta cron')
} )


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(resCapture)
app.use('/', router)


//manejador de errores
app.use(errorMidleWare)

server(app)




