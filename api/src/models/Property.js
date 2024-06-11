const { DataTypes, UUIDV4 } = require("sequelize")


module.exports = (sequelizeInstance)=>{
    const Property = sequelizeInstance.define('Property', {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: UUIDV4
        },
        address:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        bathrooms:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        bedRooms:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        size:{
            type: DataTypes.FLOAT,
            defaultValue:0
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        type:{
            type: DataTypes.ENUM('departamento', 'casa', 'local', 'galpon', 'terreno', 'deposito', 'franquicia', 'otro')
        },
        price:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    })
    Property.associate = (models)=>{
        models.Property.belongsTo(models.Lessor)
        models.Property.hasMany(models.Rent)

    }

    return Property
}