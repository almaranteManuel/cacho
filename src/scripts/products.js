//FILTRAMOS PRODUCTOS SI HAY UNA BUSQUEDA
function filterProducts(products, query) {
  return query ? products.filter(product => product.code.includes(query)) : products;
}

//ACA MANEJAMOS LOS BOTONES DE LOS PRODUCTOS
function addEventListenersToButtons() {
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      if (productId) {
        editProduct(productId);
      } else {
        console.error('ID del producto no definido.');
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      if (productId) {
        deleteProduct(productId);
      } else {
        console.error('ID del producto no definido.');
      }
    });
  });
}

//ACA DEFINIMOS Y CREAMOS LA TABLA PARA EL INDEX
function createProductRow(product) {
  const price = parseFloat(product.price) || 0;
  const retailPrice = parseFloat(product.retail_price) || 0;
  const ownPrice = parseFloat(product.own_price) || 0;
  const stock = parseInt(product.stock, 10) || 0;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${product.code}</td>
    <td>${product.description}</td>
    <td>$ ${price.toFixed(2)}</td>
    <td>$ ${retailPrice.toFixed(2)}</td>
    <td>$ ${ownPrice.toFixed(2)}</td>
    <td>${stock}</td>
    <td>
      <button class="edit-btn" data-id="${product.id}">Editar</button>
      <button class="delete-btn" data-id="${product.id}">Eliminar</button>
    </td>
  `;
  return row;
}


// Función para cargar productos
function loadProducts(query = '') {
  if (window.api && typeof window.api.loadProducts === 'function') {
    window.api.loadProducts()
      .then((products) => {
        const filteredProducts = filterProducts(products, query);
        const productTableBody = document.getElementById('product-list');
        productTableBody.innerHTML = '';

        filteredProducts.forEach(product => {
          const row = createProductRow(product);
          productTableBody.appendChild(row);
        });

        // Actualizar el contador de productos
        const productCount = filteredProducts.length;
        document.getElementById('productCount').textContent = `Total de productos: ${productCount}`;

        addEventListenersToButtons(); // Añadir eventos después de crear las filas
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
      });
  } else {
    console.error('window.api no está definido.');
  }
}

// Función para manejar la creación de un producto
function handleCreateProduct(product) {
  if (window.api && typeof window.api.addProduct === 'function') {
    window.api.addProduct(product)
      .then(() => {
        modal.style.display = 'none';
        loadProducts();
      })
      .catch(err => {
        console.error('Error al agregar el producto:', err);
      });
  } else {
    console.error('window.api no está definido.');
  }
}

// Función para manejar la edición de un producto
function handleEditProduct(id, product) {
  if (window.api && typeof window.api.editProduct === 'function') {
    window.api.editProduct(id, product)
      .then(() => {
        modal.style.display = 'none';
        loadProducts();
      })
      .catch(err => {
        console.error('Error al editar el producto:', err);
      });
  } else {
    console.error('window.api no está definido.');
  }
}

// Función para manejar la eliminación de un producto
function deleteProduct(id) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');

  if (confirmDelete) {
    if (window.api && typeof window.api.deleteProduct === 'function') {
      window.api.deleteProduct(id)
        .then(() => {
          loadProducts(); // Recargar la lista de productos después de eliminar uno
        })
        .catch(err => {
          console.error('Error al eliminar el producto:', err);
        });
    } else {
      console.error('window.api no está definido.');
    }
  }
}

// Manejo del campo de búsqueda
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  loadProducts(query);
});

// Manejo del botón de abrir el modal
const modal = document.getElementById('productModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModal = document.getElementsByClassName('close')[0];

openModalBtn.onclick = function() {
  document.getElementById('modalTitle').textContent = 'Agregar Producto';
  document.getElementById('addProductForm').dataset.mode = 'add';
  document.getElementById('addProductForm').dataset.id = ''; // Vacío en modo agregar
  addProductForm.reset();
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

// Manejo del formulario de adición y edición de productos
const addProductForm = document.getElementById('addProductForm');
addProductForm.onsubmit = function(event) {
  event.preventDefault();

  // Recoger datos del formulario
  const formData = new FormData(addProductForm);
  const product = {
    code: formData.get('code'),
    description: formData.get('description'),
    price: formData.get('price') || 0,
    own_price: formData.get('own_price') || 0,
    stock: formData.get('stock') || 0,
    variant: formData.get('variant') || 1.7,
  };

  const mode = addProductForm.dataset.mode;
  const id = addProductForm.dataset.id;

  if (mode === 'edit') {
    handleEditProduct(id, product);
  } else {
    handleCreateProduct(product);
  }
};

// Función para manejar la edición de un producto
function editProduct(id) {
  if (window.api && typeof window.api.getProductById === 'function') {
    window.api.getProductById(id)
      .then(product => {
        const productData = product.dataValues;

        // Llenar los campos del formulario con los datos del producto
        document.getElementById('code').value = productData.code || '';
        document.getElementById('description').value = productData.description || '';
        document.getElementById('price').value = productData.price || '';
        document.getElementById('own_price').value = productData.own_price || '';
        document.getElementById('stock').value = productData.stock || '';
        document.getElementById('variant').value = productData.variant || '1.7';

        // Configurar el formulario para el modo de edición
        addProductForm.dataset.mode = 'edit';
        addProductForm.dataset.id = id;

        // Actualizar el título del modal y mostrarlo
        document.getElementById('modalTitle').textContent = 'Editar Producto';
        modal.style.display = 'block';
      })
      .catch(err => {
        console.error('Error al obtener el producto:', err);
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
window.addEventListener('DOMContentLoaded', () => loadProducts());
