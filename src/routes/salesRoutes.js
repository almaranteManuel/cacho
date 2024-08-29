// routes/salesRoutes.js
const { ipcMain } = require('electron');
const SaleController = require('../controllers/SaleController');

module.exports = () => {
  ipcMain.handle('loadSales', SaleController.getAll);
  ipcMain.handle('add-sale', (event, saleData) => SaleController.create(saleData));
  ipcMain.handle('editSale', (event, id, saleData) => SaleController.update(id, saleData));
  ipcMain.handle('deleteSale', (event, id) => SaleController.delete(id));
  ipcMain.handle('get-sale-by-id', (event, id) => SaleController.getById(id));
  ipcMain.handle('getSaleBymonth', (event, year, month) => SaleController.getByMonth(year, month));
  ipcMain.handle('getSaleByYear', (event, year) => SaleController.getByYear(year));
};
