const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Supplier = require('./SupplierModel');

const Purchase = sequelize.define('Purchase', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Supplier,
      key: 'id',
    },
  },
}, {
  tableName: 'Purchases',
  timestamps: false,
});

// Definimos la asociación
Purchase.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Supplier.hasMany(Purchase, { foreignKey: 'supplier_id' });

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = Purchase;
