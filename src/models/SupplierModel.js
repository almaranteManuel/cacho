const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definición del modelo de Supplier
const Supplier = sequelize.define('Supplier', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Suppliers',
  timestamps: false,
});

module.exports = Supplier;
