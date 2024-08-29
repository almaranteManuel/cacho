const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definición del modelo de Producto
const Sale = sequelize.define('Sale', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'Sales',
  timestamps: false,
});

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = Sale;
