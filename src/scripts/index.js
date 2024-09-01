
//MODO OSCURO
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    if (window.darkMode && typeof window.darkMode.toggle === 'function') {
      const isDarkMode = await window.darkMode.toggle();
      document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
    } else {
      console.error('darkMode no está definido o toggle no es una función.');
    }
  });
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    if (window.darkMode && typeof window.darkMode.system === 'function') {
      await window.darkMode.system();
      document.getElementById('theme-source').innerHTML = 'System';
    } else {
      console.error('darkMode no está definido o system no es una función.');
    }
  });
  