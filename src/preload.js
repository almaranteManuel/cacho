const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {

  /////// PRODUCTOS ///////
  loadProducts: () => ipcRenderer.invoke('load-products'),
  addProduct: (productData) => ipcRenderer.invoke('add-product', productData),
  editProduct: (id, productData) => ipcRenderer.invoke('editProduct', id, productData),
  getProductById: (id) => ipcRenderer.invoke('get-product-by-id', id),
  searchProducts: (query) => ipcRenderer.invoke('search-products', query),
  deleteProduct: (id) => ipcRenderer.invoke('deleteProduct', id),

  /////// CATEGORIAS ///////
  loadCategories: () => ipcRenderer.invoke('load-categories'),

  /////// VENTAS ///////
  loadSales: () => ipcRenderer.invoke('loadSales'),
  addSale: (saleData) => ipcRenderer.invoke('add-sale', saleData),
  editSale: (id, saleData) => ipcRenderer.invoke('editSale', id, saleData),
  getSaleById: (id) => ipcRenderer.invoke('get-sale-by-id', id),
  deleteSale: (id) => ipcRenderer.invoke('deleteSale', id),
  getSaleBymonth: (year, month) => ipcRenderer.invoke('getSaleBymonth', year, month),
  getSaleByYear: (year) => ipcRenderer.invoke('getSaleByYear', year),

  /////// COMPRAS ///////
  loadPurchases: () => ipcRenderer.invoke('loadPurchases'),
  addPurchase: (purchaseData) => ipcRenderer.invoke('addPurchase', purchaseData),
  editPurchase: (id, purchaseData) => ipcRenderer.invoke('editPurchase', id, purchaseData),
  getPurchaseById: (id) => ipcRenderer.invoke('get-purchase-by-id', id),
  deletePurchase: (id) => ipcRenderer.invoke('deletePurchase', id),
  getPurchaseBymonth: (year, month) => ipcRenderer.invoke('getPurchaseBymonth', year, month),
  getPurchaseByYear: (year) => ipcRenderer.invoke('getPurchaseByYear', year),

  /////// PROVEEDORES ///////
  loadSuppliers: () => ipcRenderer.invoke('loadSuppliers'),
  addSupplier: (supplierData) => ipcRenderer.invoke('addSupplier', supplierData),
  editSupplier: (id, supplierData) => ipcRenderer.invoke('editSupplier', id, supplierData),
  getSupplierById: (id) => ipcRenderer.invoke('get-supplier-by-id', id),
  deleteSupplier: (id) => ipcRenderer.invoke('deleteSupplier', id),
});
