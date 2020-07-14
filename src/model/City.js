// import sequelize
var Sequelize = require('sequelize');

// importing connection databse
var sequelize = require('./database');

// import model for FK roleID
var State = require('./State');

var City = sequelize.define('city', {
    name: Sequelize.STRING,
    stateId: {
        type: Sequelize.INTEGER,
        // This is a referene to another model
        references: {
            model: State,
            key: 'id'
        }
    }
},
{
    timestamps: false,
});

City.belongsTo(State)

module.exports = City