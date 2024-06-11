
const { DataTypes } = require("sequelize")


module.exports = (sequelizeInstance)=>{
    const Lessor = sequelizeInstance.define('Lessor', {
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
    Lessor.associate = (models)=>{
        models.Lessor.hasMany(models.Property, {onDelete: 'cascade'})
        models.Lessor.hasMany(models.Rent)
    }

    return Lessor
}