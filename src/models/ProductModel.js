const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definición del modelo de Producto
const Product = sequelize.define('Product', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  own_price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  variant: {
    type: DataTypes.FLOAT,
    defaultValue: 1.7,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = Product;
