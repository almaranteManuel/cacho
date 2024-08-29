const { Sequelize } = require('sequelize');
const path = require('path');

// Configuración de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../data/Ventas.db'),
  logging: false,
});

module.exports = sequelize;
