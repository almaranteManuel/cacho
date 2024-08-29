const Category = require('../models/CategoryModel'); // Asegúrate de que la ruta sea correcta
const { Sequelize } = require('sequelize');

const categoryController = {
  getAll: async () => {
    try {
      const categories = await Category.findAll();
      return categories.map(category => ({
        ...category.toJSON()
      }));
    } catch (error) {
      console.error('Error al obtener categorias:', error);
      return { error: 'Error al obtener categorias' };
    }
  },

  getById: async (productId) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return { error: 'Producto no encontrado' };
      }
      return product;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return { error: 'Error al obtener el producto' };
    }
  },

  create: async (product) => {
    console.log('Datos recibidos para crear producto:', product);
    try {
  
      const newProduct = await Product.create(product);
      console.log('Producto creado:', newProduct);
      return { id: newProduct.id };
    } catch (error) {
      console.error('Error al crear el producto:', error);
      return { error: 'Error al crear el producto' };
    }
  },  

  update: async (id, productData) => {
    console.log('Datos recibidos para editar producto:', productData);
    try {
      const result = await Product.update(productData, {
        where: { id },
      });
      return { changes: result[0] };
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return { error: 'Error al actualizar el producto' };
    }
  },

  delete: async (id) => {
    try {
      const result = await Product.destroy({ where: { id } });
      return { changes: result };
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return { error: 'Error al eliminar el producto' };
    }
  },

};

module.exports = categoryController;
