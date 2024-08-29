const Product = require('../models/ProductModel'); // Asegúrate de que la ruta sea correcta
const { Sequelize } = require('sequelize');

const productController = {
  getAll: async () => {
    try {
      const products = await Product.findAll();
      return products.map(product => ({
        ...product.toJSON(),
        retail_price: product.price * (product.variant || 1.7),
      }));
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return { error: 'Error al obtener productos' };
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

  searchByCode: async (code) => {
    try {
      const products = await Product.findAll({
        where: {
          code: {
            [Sequelize.Op.like]: `%${code}%`,
          },
        },
      });
      return products;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      return { error: 'Error al buscar productos' };
    }
  },
};

module.exports = productController;
