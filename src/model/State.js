var Sequelize = require('sequelize');
var sequelize = require('./database');

var State = sequelize.define('state', {
    state: Sequelize.STRING,
    fu: Sequelize.STRING
},
{
    timestamps: false,
});

module.exports = State;