// Función para cargar las ventas de un mes específico y calcular el total
function loadMonthlySales(year, month) {
  if (window.api && typeof window.api.getSaleBymonth === "function") {
    window.api
      .getSaleBymonth(year, month)
      .then((sales) => {
        const tbody = document
          .getElementById("monthSalesTable")
          .querySelector("tbody");
        const monthTotalElement = document.getElementById("monthTotal");
        tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        let monthTotal = 0;

        sales.forEach((sale) => {
          const row = createSaleRow(sale);
          tbody.appendChild(row);
          monthTotal += sale.totalAmount;
        });

        monthTotalElement.textContent = `$ ${monthTotal.toFixed(2)}`;
      })
      .catch((err) => {
        console.error("Error al cargar las ventas del mes:", err);
      });
  } else {
    console.error("window.api no está definido.");
  }
}

// Función para cargar las ventas totales de un año específico y calcular el total
function loadYearlySales(year) {
  if (window.api && typeof window.api.getSaleByYear === "function") {
    window.api
      .getSaleByYear(year)
      .then((sales) => {
        const tbody = document
          .getElementById("yearSalesTable")
          .querySelector("tbody");
        const yearTotalElement = document.getElementById("yearTotal");
        tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        let yearTotal = 0;

        sales.forEach((sale) => {
          const row = createSaleRow(sale);
          // tbody.appendChild(row);
          yearTotal += sale.totalAmount;
        });

        yearTotalElement.textContent = `$ ${yearTotal.toFixed(2)}`;
      })
      .catch((err) => {
        console.error("Error al cargar las ventas del año:", err);
      });
  } else {
    console.error("window.api no está definido.");
  }
}

// Función auxiliar para crear una fila de tabla para una compra
function createSaleRow(sale) {
  const row = document.createElement("tr");
  const formattedDate = new Date(sale.date).toLocaleDateString();

  row.innerHTML = `
      <td>${formattedDate}</td>
      <td>$ ${sale.totalAmount}</td>
    `;

  return row;
}

// Event Listeners para formularios de búsqueda
document
  .getElementById("monthForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const monthInput = document.getElementById("month").value;
    const [year, month] = monthInput.split("-");
    loadMonthlySales(year, month);
  });

document
  .getElementById("yearForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const year = document.getElementById("year").value;
    loadYearlySales(year);
  });

// Funcionalidad del botón Volver
document.getElementById("backButton").addEventListener("click", () => {
  window.history.back();
});

function generarPDF(event) {
  event.preventDefault();

  // Crear una instancia de jsPDF
  const doc = new jsPDF();

  // Título del PDF
  doc.setFontSize(18);
  doc.text("Reporte de Ventas", 10, 10);

  // Subtítulo Ventas del Mes
  doc.setFontSize(14);
  doc.text("Ventas del Mes", 10, 20);

  // Obtener los datos de la tabla de ventas del mes
  const monthTable = document.getElementById("monthSalesTable");
  const monthRows = monthTable.querySelectorAll("tbody tr");
  let startY = 30;

  // Agregar encabezado de la tabla
  doc.setFontSize(12);
  doc.text("Fecha", 10, startY);
  doc.text("Monto Total", 60, startY);
  startY += 10;

  // Agregar filas de la tabla de ventas del mes
  monthRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const date = cells[0].innerText;
    const total = cells[1].innerText;

    doc.text(date, 10, startY);
    doc.text(total, 60, startY);
    startY += 10;
  });

  // Total del Mes
  const monthTotal = document.getElementById("monthTotal").innerText;
  doc.text(`Total del Mes: ${monthTotal}`, 10, startY);
  startY += 20;

  // Subtítulo Ventas del Año
  doc.setFontSize(14);
  doc.text("Total del Año", 10, startY);
  //startY += 10;

  // Obtener los datos de la tabla de ventas del año
  const yearTable = document.getElementById("yearSalesTable");
  const yearRows = yearTable.querySelectorAll("tbody tr");

  // Agregar encabezado de la tabla del año
  doc.setFontSize(12);
  //doc.text('Fecha', 10, startY);
  //doc.text('Monto Total', 60, startY);
  startY += 10;

  // Agregar filas de la tabla de ventas del año
  yearRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    //const date = cells[0].innerText;
    //const total = cells[1].innerText;

    //doc.text(date, 10, startY);
    //doc.text(total, 60, startY);
    startY += 10;
  });

  // Total del Año
  const yearTotal = document.getElementById("yearTotal").innerText;
  doc.text(`Total del Año: ${yearTotal}`, 10, startY);

  // Guardar el PDF con un nombre específico
  doc.save("reporte_ventas.pdf");
}

function recorrerTabla() {
  let tableContent = "";
  let monthTotal = 0;

  const table = document.getElementById("monthSalesTable");

  for (let i = 0; i <= table.rows.length - 1; i++) {
    tableContent += "\n";
    for (let j = 0; j <= table.rows[i].cells.length - 1; j++) {
      let col = table.rows[i].cells[j].innerText;
      if (j === 0) {
        tableContent += `* ${col}`;
      } else {
        tableContent += ` -> ${col}`;
        // Suma el total de la venta si está en la columna de montos
        if (j === 1) {
          monthTotal += parseFloat(col.replace("$", "").replace(",", ""));
        }
      }
    }
  }

  return { tableContent, monthTotal };
}

// Ejecutar funciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  loadYearlySales(currentYear); // Cargar compras del año actual al cargar la página
});
