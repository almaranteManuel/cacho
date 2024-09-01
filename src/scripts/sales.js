
  //ACA MANEJAMOS LOS BOTONES DE LAS VENTAS
  function addEventListenersToButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function() {
        const saleId = this.dataset.id;
        if (saleId) {
          editSale(saleId);
        } else {
          console.error('ID de la venta no definido.');
        }
      });
    });
  
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
        const saleId = this.dataset.id;
        if (saleId) {
          deleteSale(saleId);
        } else {
          console.error('ID de la venta no definido.');
        }
      });
    });
  }
  
  // Función para convertir la fecha a la zona horaria deseada
  function convertToDesiredTimeZone(date) {
    const utcDate = new Date(date);
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(utcDate.getTime() + offset);
  }

  // Función para formatear la fecha en español
  function formatSpanishDate(date) {
    // Formatear la fecha a español usando `toLocaleDateString`
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  
  //ACA DEFINIMOS Y CREAMOS LA TABLA PARA EL INDEX
  function createSaleRow(sale) {
  
    const row = document.createElement('tr');
    const formmatedDate = formatSpanishDate(convertToDesiredTimeZone(sale.date));
    row.innerHTML = `
      <td>${formmatedDate}</td>
      <td>$ ${sale.totalAmount}</td>
      <td>
        <button class="edit-btn" data-id="${sale.id}">Editar</button>
        <button class="delete-btn" data-id="${sale.id}">Eliminar</button>
      </td>
    `;
    return row;
  }
  
  
  // Función para cargar ventas
  function loadSales(query = '') {
    if (window.api && typeof window.api.loadSales === 'function') {
        window.api.loadSales()
        .then(sales => {
          console.log(sales); // Verifica aquí que las ventas estén llegando correctamente
          const saleTableBody = document.getElementById('sale-list');
          saleTableBody.innerHTML = '';
      
          sales.forEach(sale => {
            const row = createSaleRow(sale);
            saleTableBody.appendChild(row);
          });
      
          addEventListenersToButtons();
        })
        .catch(err => {
          console.error('Error al cargar ventas:', err);
        });      
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la creación de un producto
  function handleCreateSale(sale) {
    if (window.api && typeof window.api.addSale === 'function') {
      window.api.addSale(sale)
        .then(() => {
          modal.style.display = 'none';
          loadSales();
        })
        .catch(err => {
          console.error('Error al agregar la venta:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la edición de una venta
  function handleEditSale(id, sale) {
    if (window.api && typeof window.api.editSale === 'function') {
      window.api.editSale(id, sale)
        .then(() => {
          modal.style.display = 'none';
          loadSales();
        })
        .catch(err => {
          console.error('Error al editar la venta:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la eliminación de una venta
  function deleteSale(id) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta venta?');
  
    if (confirmDelete) {
      if (window.api && typeof window.api.deleteSale === 'function') {
        window.api.deleteSale(id)
          .then(() => {
            loadSales(); // Recargar la lista de productos después de eliminar uno
          })
          .catch(err => {
            console.error('Error al eliminar la venta:', err);
          });
      } else {
        console.error('window.api no está definido.');
      }
    }
  }
  
  // Manejo del botón de abrir el modal
  const modal = document.getElementById('saleModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModal = document.getElementsByClassName('close')[0];
  
  openModalBtn.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Agregar Venta';
    document.getElementById('addSaleForm').dataset.mode = 'add';
    document.getElementById('addSaleForm').dataset.id = ''; // Vacío en modo agregar
    addSaleForm.reset();
    modal.style.display = 'block';
  }
  
  // Manejo del botón de cerrar el modal
  closeModal.onclick = function() {
    modal.style.display = 'none';
  }
  
  // Cerrar el modal cuando se hace clic fuera de él
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
  
  // Manejo del formulario de adición y edición de ventas
  const addSaleForm = document.getElementById('addSaleForm');
  addSaleForm.onsubmit = function(event) {
    event.preventDefault();
  
    // Recoger datos del formulario
    const formData = new FormData(addSaleForm);
    const sale = {
      date: new Date(formData.get('date')).toISOString(),
      totalAmount: formData.get('totalAmount'),
    };
  
    const mode = addSaleForm.dataset.mode;
    const id = addSaleForm.dataset.id;
  
    if (mode === 'edit') {
      handleEditSale(id, sale);
    } else {
      handleCreateSale(sale);
    }
  };
  
  // Función para manejar la edición de una venta
  function editSale(id) {
    if (window.api && typeof window.api.getSaleById === 'function') {
      window.api.getSaleById(id)
        .then(sale => {
          const saleData = sale.dataValues;
  
          // Llenar los campos del formulario con los datos del producto
          document.getElementById('date').value = saleData.date || '';
          document.getElementById('totalAmount').value = saleData.totalAmount || '';
  
          // Configurar el formulario para el modo de edición
          addSaleForm.dataset.mode = 'edit';
          addSaleForm.dataset.id = id;
  
          // Actualizar el título del modal y mostrarlo
          document.getElementById('modalTitle').textContent = 'Editar Venta';
          modal.style.display = 'block';
        })
        .catch(err => {
          console.error('Error al obtener la venta:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Funcionalidad del botón Volver
  document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
  });
  
  // Cargar productos cuando la página se carga
  window.addEventListener('DOMContentLoaded', () => loadSales());
  