
// Función para cargar proveedores en el select
function loadSuppliers() {
    if (window.api && typeof window.api.loadSuppliers === 'function') {
      window.api.loadSuppliers()
        .then(suppliers => {
          const supplierSelect = document.getElementById('supplier_id');
          supplierSelect.innerHTML = ''; // Limpiar opciones anteriores
  
          suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.name;
            supplierSelect.appendChild(option);
          });
        })
        .catch(err => {
          console.error('Error al cargar proveedores:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  //ACA MANEJAMOS LOS BOTONES DE LOS PRODUCTOS
  function addEventListenersToButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function() {
        const purchaseId = this.dataset.id;
        if (purchaseId) {
          editPurchase(purchaseId);
        } else {
          console.error('ID de la compra no definido.');
        }
      });
    });
  
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
        const purchaseId = this.dataset.id;
        if (purchaseId) {
          deletePurchase(purchaseId);
        } else {
          console.error('ID de la compra no definido.');
        }
      });
    });
  }
  
  //ACA DEFINIMOS Y CREAMOS LA TABLA PARA EL INDEX
  function createPurchaseRow(purchase) {

    const row = document.createElement('tr');
    const formmatedDate = new Date(purchase.date).toLocaleDateString();
    row.innerHTML = `
      <td>${formmatedDate}</td>
      <td>$ ${purchase.totalAmount}</td>
      <td>${purchase.Supplier.name}</td>
      <td>
        <button class="edit-btn" data-id="${purchase.id}">Editar</button>
        <button class="delete-btn" data-id="${purchase.id}">Eliminar</button>
      </td>
    `;
    return row;
  }
  
  
  // Función para cargar productos
  function loadPurchases(query = '') {
    if (window.api && typeof window.api.loadPurchases === 'function') {
      window.api.loadPurchases()
        .then((purchases) => {
           console.log('Estructura de purchases:', purchases);
          const purchaseTableBody = document.getElementById('purchase-list');
          purchaseTableBody.innerHTML = '';
  
          purchases.forEach(purchase => {
            const row = createPurchaseRow(purchase);
            purchaseTableBody.appendChild(row);
          });
  
          addEventListenersToButtons(); // Añadir eventos después de crear las filas
        })
        .catch(err => {
          console.error('Error al cargar compras:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la creación de una compra
  function handleCreatePurchase(purchase) {
    if (window.api && typeof window.api.addPurchase === 'function') {
      window.api.addPurchase(purchase)
        .then(() => {
          modal.style.display = 'none';
          loadPurchases();
        })
        .catch(err => {
          console.error('Error al agregar la compra:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la edición de una compra
  function handleEditPurchase(id, purchase) {
    if (window.api && typeof window.api.editPurchase === 'function') {
      window.api.editPurchase(id, purchase)
        .then(() => {
          modal.style.display = 'none';
          loadPurchases();
        })
        .catch(err => {
          console.error('Error al editar la compra:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la eliminación de una compra
  function deletePurchase(id) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta compra?');
  
    if (confirmDelete) {
      if (window.api && typeof window.api.deletePurchase === 'function') {
        window.api.deletePurchase(id)
          .then(() => {
            loadPurchases(); // Recargar la lista de compras después de eliminar uno
          })
          .catch(err => {
            console.error('Error al eliminar la compra:', err);
          });
      } else {
        console.error('window.api no está definido.');
      }
    }
  }
  
  // Manejo del botón de abrir el modal
  const modal = document.getElementById('purchaseModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModal = document.getElementsByClassName('close')[0];
  
  openModalBtn.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Agregar Compra';
    document.getElementById('addPurchaseForm').dataset.mode = 'add';
    document.getElementById('addPurchaseForm').dataset.id = ''; // Vacío en modo agregar
    addPurchaseForm.reset();
    loadSuppliers(); // Cargar los proveedores antes de mostrar el modal
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
  
  // Manejo del formulario de adición y edición de compras
  const addPurchaseForm = document.getElementById('addPurchaseForm');
  addPurchaseForm.onsubmit = function(event) {
    event.preventDefault();
  
    // Recoger datos del formulario
    const formData = new FormData(addPurchaseForm);
    const purchase = {
      date: formData.get('date'),
      totalAmount: formData.get('totalAmount'),
      supplier_id: formData.get('supplier_id'),
    };
  
    const mode = addPurchaseForm.dataset.mode;
    const id = addPurchaseForm.dataset.id;
  
    if (mode === 'edit') {
      handleEditPurchase(id, purchase);
    } else {
      handleCreatePurchase(purchase);
    }
  };
  
  // Función para manejar la edición de una compra
  function editPurchase(id) {
    if (window.api && typeof window.api.getPurchaseById === 'function') {
      window.api.getPurchaseById(id)
        .then(purchase => {
          const purchaseData = purchase.dataValues;
  
          // Llenar los campos del formulario con los datos de la compra
          document.getElementById('date').value = purchaseData.date || '';
          document.getElementById('totalAmount').value = purchaseData.totalAmount || '';
  
          loadSuppliers(); // Cargar proveedores y luego seleccionar el actual
          document.getElementById('supplier_id').value = purchaseData.supplier_id || '';
  
          // Configurar el formulario para el modo de edición
          addPurchaseForm.dataset.mode = 'edit';
          addPurchaseForm.dataset.id = id;
  
          // Actualizar el título del modal y mostrarlo
          document.getElementById('modalTitle').textContent = 'Editar Compra';
          modal.style.display = 'block';
        })
        .catch(err => {
          console.error('Error al obtener la compra:', err);
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
  window.addEventListener('DOMContentLoaded', () => loadPurchases());
  