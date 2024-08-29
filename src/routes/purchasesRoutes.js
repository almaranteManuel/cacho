// routes/productRoutes.js
const { ipcMain } = require('electron');
const purchaseController = require('../controllers/PurchaseController');

module.exports = () => {
  ipcMain.handle('loadPurchases', purchaseController.getAll);
  ipcMain.handle('addPurchase', (event, purchaseData) => purchaseController.create(purchaseData));
  ipcMain.handle('editPurchase', (event, id, purchaseData) => purchaseController.update(id, purchaseData));
  ipcMain.handle('deletePurchase', (event, id) => purchaseController.delete(id));
  ipcMain.handle('get-purchase-by-id', (event, id) => purchaseController.getById(id));
  ipcMain.handle('getPurchaseBymonth', (event, year, month) => purchaseController.getByMonth(year, month));
  ipcMain.handle('getPurchaseByYear', (event, year) => purchaseController.getByYear(year));
};
