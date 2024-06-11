require('dotenv').config()
const Sequelize = require('sequelize')

function setWorkSeting(production = false, ssl = false) {
    const pg = require('pg')
    const options = {
        native: false,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: pg,
        logging: ssl,
        // dialectOptions: {
        //   ssl: {
        //     require: ssl,
        //     rejectUnauthorized: false
        //   }
        // }, 
    }                                     //true                        false
    let url = production ? process.env.PRODUCTION_URL_DATABASE : process.env.DATABASE_URL
    return new Sequelize(url, options)
}

const sequelize = setWorkSeting(false);

const fs = require('fs')
const path = require('path')

//autenticando conexion
sequelize.authenticate()
    .then(() => console.log('conexion con base de datos establecida'))
    .catch(err => console.error(err))

const db = {}
const modelsPath = path.join(__dirname, '..', 'models')
fs.readdirSync(modelsPath)
    .filter(model => model.indexOf('.') != 0 && model.slice(-3) == '.js')
    .forEach(model => db[model.slice(0, -3)] = require(path.join(modelsPath, model))(sequelize))


Object.keys(db).forEach(model => {
    if (db[model].hasOwnProperty('associate')) {
        db[model].associate(db)

    }
})


console.log('db', db)
module.exports = {
    sequelize,
    ...sequelize.models
}