
const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('user', {
  
  name: {
      type: Sequelize.STRING,
      allowNull: false, 
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true, 
  },
  phone: {
      type: Sequelize.STRING, 
      allowNull: false, 
      unique: true, 
  },
 
});


sequelize.sync();


module.exports = User;