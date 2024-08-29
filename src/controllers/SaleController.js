const Sale = require('../models/SaleModel');
const { Op } = require('sequelize');

const saleController = {
  getAll: async () => {
    try {
      const sales = await Sale.findAll({order: [['date', 'DESC']]});
      return sales.map(sale => sale.toJSON());
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      throw error; // Es importante lanzar el error para que ipcMain lo maneje
    }
  },

  getById: async (saleId) => {
    try {
      const sale = await Sale.findByPk(saleId);
      if (!sale) {
        return { error: 'Venta no encontrada' };
      }
      return sale;
    } catch (error) {
      console.error('Error al obtener la venta:', error);
      return { error: 'Error al obtener la venta' };
    }
  },

  create: async (sale) => {
    console.log('Datos recibidos para crear la venta:', sale);
    try {
  
      const newSale = await Sale.create(sale);
      console.log('Venta creada:', newSale);
      return { id: newSale.id };
    } catch (error) {
      console.error('Error al crear la venta:', error);
      return { error: 'Error al crear la venta' };
    }
  },  

  update: async (id, saleData) => {
    console.log('Datos recibidos para editar venta:', saleData);
    try {
      const result = await Sale.update(saleData, {
        where: { id },
      });
      return { changes: result[0] };
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      return { error: 'Error al actualizar la venta' };
    }
  },

  delete: async (id) => {
    try {
      const result = await Sale.destroy({ where: { id } });
      return { changes: result };
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      return { error: 'Error al eliminar la venta' };
    }
  },

  // Obtener ventas del mes
  getByMonth: async (year, month) => {
    try {
      const sales = await Sale.findAll({
        where: {
          date: {
            [Op.gte]: new Date(year, month - 1, 1),
            [Op.lt]: new Date(year, month, 1),
          },
        },
        order: [['date', 'DESC']],
      });
      return sales.map(sale => sale.toJSON());
    } catch (error) {
      console.error('Error al obtener ventas del mes:', error);
      return { error: 'Error al obtener ventas del mes' };
    }
  },

  // Obtener ventas totales de un año
  getByYear: async (year) => {
    try {
      const sales = await Sale.findAll({
        where: {
          date: {
            [Op.gte]: new Date(year, 0, 1),
            [Op.lt]: new Date(year + 1, 0, 1),
          },
        },
        order: [['date', 'DESC']],
      });
      console.log('Ventas del año:', sales); // Imprimir la respuesta para depuración
      return sales.map(sale => sale.toJSON());
    } catch (error) {
      console.error('Error al obtener ventas del año:', error);
      return { error: 'Error al obtener ventas del año' };
    }
  },

};

module.exports = saleController;
