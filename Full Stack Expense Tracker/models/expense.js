const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync();

module.exports = Expense;