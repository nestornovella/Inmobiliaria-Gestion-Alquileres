const { DataTypes, UUIDV4 } = require("sequelize")
const Lessor = require("./Lessor")


module.exports = (sequelizeInstance)=>{
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    const Payment = sequelizeInstance.define('Payment', {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: UUIDV4
        },
        date:{
            type:DataTypes.DATE,
            defaultValue: new Date()
        },
        month:{
            type:DataTypes.STRING,
            defaultValue: months[date.getMonth()]
        },
        amount:{
            type: DataTypes.INTEGER,
        },
        commision:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        otherPyment:{
            type: DataTypes.JSON()
        },
        status:{
            type:DataTypes.ENUM('pending', 'in-office', 'lessor-sended' ),
            defaultValue: 'pending'
        }

    })
    Payment.associate = (models)=>{
        models.Payment.belongsTo(models.Rent)
    }

    return Payment
}