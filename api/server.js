const {sequelize} = require('./src/DB/db')

function server(app){


    app.listen(3000, sequelize.sync({force:false}).then(()=> console.log('server is lisening')) )
}

module.exports = server

