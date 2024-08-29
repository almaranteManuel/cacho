// routes/productRoutes.js
const { ipcMain } = require('electron');
const CategoryController = require('../controllers/CategoryController');

module.exports = () => {
  ipcMain.handle('load-categories', CategoryController.getAll);
  // ipcMain.handle('add-product', (event, productData) => CategoryController.create(productData));
  // ipcMain.handle('editProduct', (event, id, productData) => CategoryController.update(id, productData));
  // ipcMain.handle('deleteProduct', (event, id) => CategoryController.delete(id));
  // ipcMain.handle('get-product-by-id', (event, id) => CategoryController.getById(id));
};