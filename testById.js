const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/data/Ventas.db');

function getById(productId, callback) {
  if (typeof callback !== 'function') {
    console.error('Callback no es una función');
    return;
  }

  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      callback({ error: 'Error al obtener el producto' });
      return;
    }
    callback(null, row || { error: 'Producto no encontrado' });
  });
}

// Prueba la función
const testProductId = 2; // Reemplaza con un ID válido
getById(testProductId, (err, product) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Producto:', product);
  }
});
