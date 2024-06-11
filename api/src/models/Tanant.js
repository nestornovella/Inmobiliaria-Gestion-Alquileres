
const { DataTypes } = require("sequelize")


module.exports = (sequelizeInstance)=>{
    const Tanant = sequelizeInstance.define('Tanant', {
        email:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        fullName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        role:{
            type: DataTypes.STRING,
            defaultValue:'user'
        }

    })
    Tanant.associate = (models)=>{
        models.Tanant.hasMany(models.Rent)
    }

    return Tanant
}