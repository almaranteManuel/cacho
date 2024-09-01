function loadCategories() {
  if (window.api && typeof window.api.loadCategories === 'function') {
    window.api.loadCategories().then((categories) => {
      const categoryList = document.getElementById('category-list');
      categoryList.innerHTML = '';
      categories.forEach(category => {
        const item = document.createElement('li');
        item.textContent = category.name;
        categoryList.appendChild(item);
      });
    }).catch(err => {
      console.error('Error al cargar categorías:', err);
    });
  } else {
    console.error('window.api no está definido.');
  }
}

// Manejo del botón  volver
document.getElementById('backButton').addEventListener('click', () => {
  window.history.back();
});

// Manejo del formulario para agregar categorías
const addCategoryButton = document.getElementById('save-category');
addCategoryButton.addEventListener('click', () => {
  const categoryName = document.getElementById('category-name').value;

  if (window.api && typeof window.api.addCategory === 'function') {
    window.api.addCategory(categoryName).then(() => {
      loadCategories(); // Recargar categorías después de agregar una nueva
    }).catch(err => {
      console.error('Error al agregar categoría:', err);
    });
  } else {
    console.error('window.api no está definido.');
  }
});

// Cargar categorías cuando la página se carga
window.addEventListener('DOMContentLoaded', loadCategories);
