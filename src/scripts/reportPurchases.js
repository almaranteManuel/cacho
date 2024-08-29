// Función para cargar las compras de un mes específico y calcular el total
function loadMonthlyPurchases(year, month) {
    if (window.api && typeof window.api.getPurchaseBymonth === 'function') {
      window.api.getPurchaseBymonth(year, month)
        .then(purchases => {
          const tbody = document.getElementById('monthPurchasesTable').querySelector('tbody');
          const monthTotalElement = document.getElementById('monthTotal');
          tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
          let monthTotal = 0;
  
          purchases.forEach(purchase => {
            const row = createPurchaseRow(purchase);
            tbody.appendChild(row);
            monthTotal += purchase.totalAmount;
          });
  
          monthTotalElement.textContent = `$ ${monthTotal.toFixed(2)}`;
        })
        .catch(err => {
          console.error('Error al cargar las compras del mes:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para cargar las compras totales de un año específico y calcular el total
  function loadYearlyPurchases(year) {
    if (window.api && typeof window.api.getPurchaseByYear === 'function') {
      window.api.getPurchaseByYear(year)
        .then(purchases => {
          const tbody = document.getElementById('yearPurchasesTable').querySelector('tbody');
          const yearTotalElement = document.getElementById('yearTotal');
          tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
          let yearTotal = 0;
  
          purchases.forEach(purchase => {
            const row = createPurchaseRow(purchase);
            // tbody.appendChild(row);
            yearTotal += purchase.totalAmount;
          });
  
          yearTotalElement.textContent = `$ ${yearTotal.toFixed(2)}`;
        })
        .catch(err => {
          console.error('Error al cargar las compras del año:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función auxiliar para crear una fila de tabla para una compra
  function createPurchaseRow(purchase) {
    const row = document.createElement('tr');
    const formattedDate = new Date(purchase.date).toLocaleDateString();
  
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>$ ${purchase.totalAmount}</td>
      <td>${purchase.Supplier.name}</td>
    `;
  
    return row;
  }
  
  // Event Listeners para formularios de búsqueda
  document.getElementById('monthForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const monthInput = document.getElementById('month').value;
    const [year, month] = monthInput.split('-');
    loadMonthlyPurchases(year, month);
  });
  
  document.getElementById('yearForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const year = document.getElementById('year').value;
    loadYearlyPurchases(year);
  });
  
  // Funcionalidad del botón Volver
  document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
  });
  
  // Ejecutar funciones cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    loadYearlyPurchases(currentYear); // Cargar compras del año actual al cargar la página
  });
  