const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-app', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;