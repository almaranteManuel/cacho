// Función para cargar las ventas de un mes específico y calcular el total
function loadMonthlySales(year, month) {
    if (window.api && typeof window.api.getSaleBymonth === 'function') {
      window.api.getSaleBymonth(year, month)
        .then(sales => {
          const tbody = document.getElementById('monthSalesTable').querySelector('tbody');
          const monthTotalElement = document.getElementById('monthTotal');
          tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
          let monthTotal = 0;
  
          sales.forEach(sale => {
            const row = createSaleRow(sale);
            tbody.appendChild(row);
            monthTotal += sale.totalAmount;
          });
  
          monthTotalElement.textContent = `$ ${monthTotal.toFixed(2)}`;
        })
        .catch(err => {
          console.error('Error al cargar las ventas del mes:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para cargar las ventas totales de un año específico y calcular el total
  function loadYearlySales(year) {
    if (window.api && typeof window.api.getSaleByYear === 'function') {
      window.api.getSaleByYear(year)
        .then(sales => {
          const tbody = document.getElementById('yearSalesTable').querySelector('tbody');
          const yearTotalElement = document.getElementById('yearTotal');
          tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
          let yearTotal = 0;
  
          sales.forEach(sale => {
            const row = createSaleRow(sale);
            // tbody.appendChild(row);
            yearTotal += sale.totalAmount;
          });
  
          yearTotalElement.textContent = `$ ${yearTotal.toFixed(2)}`;
        })
        .catch(err => {
          console.error('Error al cargar las ventas del año:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función auxiliar para crear una fila de tabla para una compra
  function createSaleRow(sale) {
    const row = document.createElement('tr');
    const formattedDate = new Date(sale.date).toLocaleDateString();
  
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>$ ${sale.totalAmount}</td>
    `;
  
    return row;
  }
  
  // Event Listeners para formularios de búsqueda
  document.getElementById('monthForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const monthInput = document.getElementById('month').value;
    const [year, month] = monthInput.split('-');
    loadMonthlySales(year, month);
  }); 
  
  document.getElementById('yearForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const year = document.getElementById('year').value;
    loadYearlySales(year);
  });
  
  // Funcionalidad del botón Volver
  document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
  });
  
  // Ejecutar funciones cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    loadYearlySales(currentYear); // Cargar compras del año actual al cargar la página
  });
  