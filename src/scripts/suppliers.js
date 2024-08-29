
  //ACA MANEJAMOS LOS BOTONES DE LAS VENTAS
  function addEventListenersToButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function() {
        const supplierId = this.dataset.id;
        if (supplierId) {
          editSupplier(supplierId);
        } else {
          console.error('ID del proveedor no definido.');
        }
      });
    });
  
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
        const supplierId = this.dataset.id;
        if (supplierId) {
          deleteSupplier(supplierId);
        } else {
          console.error('ID del proveedor no definido.');
        }
      });
    });
  }
  
  //ACA DEFINIMOS Y CREAMOS LA TABLA PARA EL INDEX
  function createSupplierRow(supplier) {
  
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${supplier.name}</td>
      <td>${supplier.email}</td>
      <td>${supplier.phone}</td>
      <td>${supplier.address}</td>
      <td>
        <button class="edit-btn" data-id="${supplier.id}">Editar</button>
        <button class="delete-btn" data-id="${supplier.id}">Eliminar</button>
      </td>
    `;
    return row;
  }
  
  
  // Función para cargar ventas
  function loadSuppliers(query = '') {
    if (window.api && typeof window.api.loadSuppliers === 'function') {
        window.api.loadSuppliers()
        .then(supplier => {
          console.log(supplier); // Verifica aquí que las ventas estén llegando correctamente
          const supplierTableBody = document.getElementById('supplier-list');
          supplierTableBody.innerHTML = '';
      
          supplier.forEach(supplier => {
            const row = createSupplierRow(supplier);
            supplierTableBody.appendChild(row);
          });
      
          addEventListenersToButtons();
        })
        .catch(err => {
          console.error('Error al cargar proveedores:', err);
        });      
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la creación de un producto
  function handleCreateSupplier(supplier) {
    if (window.api && typeof window.api.addSupplier === 'function') {
      window.api.addSupplier(supplier)
        .then(() => {
          modal.style.display = 'none';
          loadSuppliers();
        })
        .catch(err => {
          console.error('Error al agregar el proveedor:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la edición de una venta
  function handleEditSupplier(id, supplier) {
    if (window.api && typeof window.api.editSupplier === 'function') {
      window.api.editSupplier(id, supplier)
        .then(() => {
          modal.style.display = 'none';
          loadSuppliers();
        })
        .catch(err => {
          console.error('Error al editar el proveedor:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
  
  // Función para manejar la eliminación de un proveedor
  function deleteSupplier(id) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este proveedor?');
  
    if (confirmDelete) {
      if (window.api && typeof window.api.deleteSupplier === 'function') {
        window.api.deleteSupplier(id)
          .then(() => {
            loadSuppliers(); // Recargar la lista de productos después de eliminar uno
          })
          .catch(err => {
            console.error('Error al eliminar el proveedor:', err);
          });
      } else {
        console.error('window.api no está definido.');
      }
    }
  }
  
  // Manejo del botón de abrir el modal
  const modal = document.getElementById('supplierModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModal = document.getElementsByClassName('close')[0];
  
  openModalBtn.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Agregar Venta';
    document.getElementById('addSupplierForm').dataset.mode = 'add';
    document.getElementById('addSupplierForm').dataset.id = ''; // Vacío en modo agregar
    addSupplierForm.reset();
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
  const addSupplierForm = document.getElementById('addSupplierForm');
  addSupplierForm.onsubmit = function(event) {
    event.preventDefault();
  
    // Recoger datos del formulario
    const formData = new FormData(addSupplierForm);
    const supplier = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };
  
    const mode = addSupplierForm.dataset.mode;
    const id = addSupplierForm.dataset.id;
  
    if (mode === 'edit') {
      handleEditSupplier(id, supplier);
    } else {
      handleCreateSupplier(supplier);
    }
  };
  
  // Función para manejar la edición de una venta
  function editSupplier(id) {
    if (window.api && typeof window.api.getSupplierById === 'function') {
      window.api.getSupplierById(id)
        .then(supplier => {
          const supplierData = supplier.dataValues;
  
          // Llenar los campos del formulario con los datos del producto
          document.getElementById('name').value = supplierData.name || '';
          document.getElementById('email').value = supplierData.email || '';
          document.getElementById('phone').value = supplierData.phone || '';
          document.getElementById('address').value = supplierData.address || '';
  
          // Configurar el formulario para el modo de edición
          addSupplierForm.dataset.mode = 'edit';
          addSupplierForm.dataset.id = id;
  
          // Actualizar el título del modal y mostrarlo
          document.getElementById('modalTitle').textContent = 'Editar Proveedor';
          modal.style.display = 'block';
        })
        .catch(err => {
          console.error('Error al obtener el proveedor:', err);
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
  window.addEventListener('DOMContentLoaded', () => loadSuppliers());
  