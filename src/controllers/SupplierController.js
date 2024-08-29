const Supplier = require('../models/SupplierModel'); // Asegúrate de que la ruta sea correcta
const { Sequelize } = require('sequelize');

const supplierController = {
  getAll: async () => {
    try {
      const suppliers = await Supplier.findAll();
      return suppliers.map(supplier => ({
        ...supplier.toJSON(),
      }));
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      return { error: 'Error al obtener proveedores' };
    }
  },

  getById: async (supplierId) => {
    try {
      const supplier = await Supplier.findByPk(supplierId);
      if (!supplier) {
        return { error: 'proveedor no encontrado' };
      }
      return supplier;
    } catch (error) {
      console.error('Error al obtener el proveedor:', error);
      return { error: 'Error al obtener el proveedor' };
    }
  },

  create: async (supplier) => {
    console.log('Datos recibidos para crear proveedor:', supplier);
    try {
  
      const newSupplier = await Supplier.create(supplier);
      console.log('Proveedor creado:', newSupplier);
      return { id: newSupplier.id };
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      return { error: 'Error al crear el proveedor' };
    }
  },  

  update: async (id, supplierData) => {
    console.log('Datos recibidos para editar proveedor:', supplierData);
    try {
      const result = await Supplier.update(supplierData, {
        where: { id },
      });
      return { changes: result[0] };
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      return { error: 'Error al actualizar el proveedor' };
    }
  },

  delete: async (id) => {
    try {
      const result = await Supplier.destroy({ where: { id } });
      return { changes: result };
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      return { error: 'Error al eliminar el proveedor' };
    }
  },

};

module.exports = supplierController;
