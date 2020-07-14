// import sequelize
var Sequelize = require('sequelize');

// importing connection databse
var sequelize = require('./database');

// import model for FK roleID
var Role = require('./Role');
var City = require('./City');

var Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    roleId: {
        type: Sequelize.INTEGER,
        // This is a referene to another model
        references: {
            model: Role,
            key: 'id'
        }
    },
    cityId: {
        type: Sequelize.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    }
},
{
    timestamps: false,
});

Employee.belongsTo(Role);
Employee.belongsTo(City);

module.exports = Employee