const { DataTypes } = require("sequelize")


module.exports = (sequelizeInstance)=>{
    const Admin = sequelizeInstance.define('Admin', {
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
            defaultValue: 'admin'
        }

    })
    Admin.associate = (models)=>{
    }

    return Admin
}