const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definición del modelo de Categoria
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = Category;
