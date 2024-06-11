const { DataTypes, UUIDV4 } = require("sequelize")


module.exports = (sequelizeInstance)=>{
    const Office = sequelizeInstance.define('Office', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4
        },
        status:{
            type: DataTypes.ENUM('open', 'close', 'comeLater')
        }

    })
    Office.associate = (models)=>{
    }

    return Office
}