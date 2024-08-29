const Purchase = require('../models/PurchaseModel');
const Supplier = require('../models/SupplierModel');
const { Op } = require('sequelize');

const purchaseController = {
  getAll: async () => {
    try {
      const purchases = await Purchase.findAll({
        include: Supplier,
        order: [['date', 'DESC']]
      });
      return purchases.map(purchase => ({
        ...purchase.toJSON(),
      }));
    } catch (error) {
      console.error('Error al obtener compras:', error);
      return { error: 'Error al obtener compras' };
    }
  },

  getById: async (purchaseId) => {
    try {
      const purchase = await Purchase.findByPk(purchaseId);
      if (!purchase) {
        return { error: 'Compra no encontrada' };
      }
      return purchase;
    } catch (error) {
      console.error('Error al obtener la compra:', error);
      return { error: 'Error al obtener la compra' };
    }
  },

  create: async (purchase) => {
    console.log('Datos recibidos para crear compra:', purchase);
    try {
  
      const newPurchase = await Purchase.create(purchase);
      console.log('Compra creada:', newPurchase);
      return { id: newPurchase.id };
    } catch (error) {
      console.error('Error al crear la compra:', error);
      return { error: 'Error al crear la compra' };
    }
  },  

  update: async (id, purchaseData) => {
    console.log('Datos recibidos para editar compra:', purchaseData);
    try {
      const result = await Purchase.update(purchaseData, {
        where: { id },
      });
      return { changes: result[0] };
    } catch (error) {
      console.error('Error al actualizar la compra:', error);
      return { error: 'Error al actualizar la compra' };
    }
  },

  delete: async (id) => {
    try {
      const result = await Purchase.destroy({ where: { id } });
      return { changes: result };
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
      return { error: 'Error al eliminar la compra' };
    }
  },

  //COMPRAS DEL MES
  getByMonth: async (year, month) => {
    try {
      const purchases = await Purchase.findAll({
        include: Supplier,
        where: {
          date: {
            [Op.gte]: new Date(year, month - 1, 1),
            [Op.lt]: new Date(year, month, 1),
          },
        },
        order: [['date', 'DESC']],
      });
      return purchases.map(purchase => ({
        ...purchase.toJSON(),
      }));
    } catch (error) {
      console.error('Error al obtener compras del mes:', error);
      return { error: 'Error al obtener compras del mes' };
    }
  },

  // Obtener compras totales de un año
  getByYear: async (year) => {
    try {
      const purchases = await Purchase.findAll({
        include: Supplier,
        where: {
          date: {
            [Op.gte]: new Date(year, 0, 1),
            [Op.lt]: new Date(year + 1, 0, 1),
          },
        },
        order: [['date', 'DESC']],
      });
      return purchases.map(purchase => ({
        ...purchase.toJSON(),
      }));
    } catch (error) {
      console.error('Error al obtener compras del año:', error);
      return { error: 'Error al obtener compras del año' };
    }
  },

};

module.exports = purchaseController;
