const { DataTypes, UUIDV4 } = require("sequelize")
const Lessor = require("./Lessor")


module.exports = (sequelizeInstance)=>{
    
    const date = new Date()
    date.setFullYear(date.getFullYear() + 2)

    const Rent = sequelizeInstance.define('Rent', {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: UUIDV4
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
        },
        expiration:{
            type:DataTypes.DATE,
            defaultValue: date
        },
       
    })
    Rent.associate = (models)=>{
        models.Rent.belongsTo(models.Lessor)
        models.Rent.belongsTo(models.Tanant)
        models.Rent.belongsTo(models.Property)
        models.Rent.hasMany(models.Payment)
    }

    return Rent
}