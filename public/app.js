/**
 * CONTROLADOR PRINCIPAL Y DELEGACIÓN DE EVENTOS (ENTRY POINT)
 * 
 * ¿Qué hace este archivo?
 * Actúa como el orquestador o "punto de entrada" (entry point) de la aplicación.
 * Gestiona el inicio/cierre de sesión persistente, detecta cambios en la barra de navegación
 * (enrutador por hash) y define todos los manejadores de eventos (clicks, envíos de formulario)
 * utilizando delegación de eventos sobre el contenedor raíz de la SPA.
 * 
 * ¿Cómo lo hace?
 * Importa los submódulos de estado, notificaciones, peticiones REST y vistas.
 * Implementa la delegación de eventos escuchando eventos en '#app' y filtrando con 'e.target.closest'.
 * Llama a la inicialización al cargarse el DOM y al modificarse el hash en la URL.
 */

// Importaciones de los submódulos locales mediante módulos nativos de ES (ES Modules)
import { state } from './js/state.js';
import { showToast } from './js/toast.js';
import { 
  apiLogin, 
  apiRegister, 
  apiGetAnimes, 
  apiCreateAnime, 
  apiUpdateAnime, 
  apiDeleteAnime 
} from './js/api.js';
import { 
  viewLogin, 
  viewRegister, 
  viewDashboardHTML, 
  updateDashboardContent, 
  openAnimeModal, 
  closeAnimeModal 
} from './js/views.js';

/**
 * GESTIÓN DE SESIÓN Y PERSISTENCIA (LOCAL STORAGE)
 * 
 * Estas funciones se encargan de leer y escribir en el almacenamiento local (localStorage)
 * para mantener al usuario autenticado de manera permanente hasta que decida cerrar sesión.
 */
function checkAuth() {
  const savedUser = localStorage.getItem('anime_keep_user');
  if (savedUser) {
    state.user = JSON.parse(savedUser);
  }
}

function saveSession(userData) {
  localStorage.setItem('anime_keep_user', JSON.stringify(userData));
  state.user = userData;
}

function clearSession() {
  localStorage.removeItem('anime_keep_user');
  state.user = null;
  state.animes = [];
  showToast('¡Sesión cerrada con éxito!', 'success');
  navigate('#/login');
}

function navigate(hash) {
  window.location.hash = hash;
}

/**
 * RENDERIZACIÓN ASÍNCRONA DEL DASHBOARD
 * 
 * Dibuja la estructura base del dashboard y realiza la llamada a la API para obtener
 * la lista de animes. Oculta el spinner de carga (loader) y muestra la lista final
 * una vez finaliza la descarga de datos.
 */
async function renderDashboard() {
  const app = document.getElementById('app');
  app.innerHTML = viewDashboardHTML();

  try {
    state.animes = await apiGetAnimes(state.user.id);
  } catch (error) {
    showToast(error.message, 'error');
  }

  const loader = document.getElementById('loader');
  const content = document.getElementById('dashboard-content');
  if (loader && content) {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
  }

  updateDashboardContent();
}

/**
 * ENRUTADOR DE LA APLICACIÓN (SPA ROUTER POR HASH)
 * 
 * Revisa el fragmento 'hash' en la URL del navegador y decide qué vista inyectar en '#app'.
 * Implementa protección de rutas: redirige a la vista de Login si no hay sesión activa,
 * e impide volver a Login/Registro si el usuario ya inició sesión previamente.
 */
function router() {
  const hash = window.location.hash || '#/';
  const publicRoutes = ['#/login', '#/register'];

  // Validaciones de seguridad de acceso
  if (!state.user && !publicRoutes.includes(hash)) {
    showToast('Debes iniciar sesión para acceder.', 'error');
    navigate('#/login');
    return;
  }
  if (state.user && publicRoutes.includes(hash)) {
    navigate('#/dashboard');
    return;
  }

  // Redirección y renderizado de la vista solicitada
  const app = document.getElementById('app');
  if (hash === '#/' || hash === '#/dashboard') {
    renderDashboard();
  } else if (hash === '#/login') {
    app.innerHTML = viewLogin();
  } else if (hash === '#/register') {
    app.innerHTML = viewRegister();
  } else {
    navigate('#/dashboard');
  }
}

// =========================================================================
// DELEGACIÓN GLOBAL DE EVENTOS EN EL CONTENEDOR RAÍZ (#app)
// =========================================================================

/**
 * 1. MANEJADOR DE ENVÍO DE FORMULARIOS (SUBMIT)
 * 
 * Captura todos los submits de formularios (Login, Registro y CRUD Anime) en la SPA,
 * ejecuta la llamada API correspondiente y refresca la interfaz con los resultados.
 */
document.getElementById('app').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  // Procesamiento del formulario de Inicio de Sesión
  if (form.id === 'login-form') {
    const username = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value;
    try {
      const user = await apiLogin(username, pass);
      saveSession(user);
      showToast(`¡Hola de nuevo, ${user.username}!`, 'success');
      navigate('#/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  // Procesamiento del formulario de Registro
  if (form.id === 'register-form') {
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value;
    try {
      const newUser = await apiRegister(username, email, pass);
      saveSession(newUser);
      showToast('¡Cuenta registrada con éxito!', 'success');
      navigate('#/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  // Guardado de Anime (Creación o Modificación en Modal)
  if (form.id === 'anime-form') {
    const title = document.getElementById('anime-title').value.trim();
    const genre = document.getElementById('anime-genre').value.trim();
    const episodes = Number(document.getElementById('anime-episodes').value);
    const status = document.getElementById('anime-status').value;
    const rating = Number(document.getElementById('anime-rating').value);
    const synopsis = document.getElementById('anime-synopsis').value.trim();

    if (!title || !genre) {
      showToast('Por favor, completa los campos requeridos.', 'error');
      return;
    }

    const animeData = { 
      title, 
      genre, 
      episodes, 
      status, 
      rating, 
      synopsis, 
      userId: isNaN(state.user.id) ? state.user.id : Number(state.user.id) 
    };

    try {
      if (state.currentAnimeToEdit) {
        const id = state.currentAnimeToEdit.id;
        const updated = await apiUpdateAnime(id, animeData);
        state.animes = state.animes.map(a => a.id === id ? updated : a);
        showToast('Anime actualizado correctamente.', 'success');
      } else {
        const created = await apiCreateAnime(animeData);
        state.animes.push(created);
        showToast('Anime registrado correctamente.', 'success');
      }
      closeAnimeModal();
      updateDashboardContent();
    } catch (error) {
      showToast(error.message, 'error');
    }
  }
});

/**
 * 2. MANEJADOR DE EVENTOS CLIC (CLICK)
 * 
 * Captura todos los clics sobre botones dinámicos y enlaces en la SPA (cerrar sesión,
 * abrir/cerrar modal, botones de edición de anime y botones de eliminación).
 */
document.getElementById('app').addEventListener('click', async (e) => {
  const target = e.target;

  // Botón de Cerrar Sesión
  if (target.closest('#btn-logout')) {
    clearSession();
  }
  
  // Botón de Abrir Modal para crear Anime
  if (target.closest('#btn-add-anime')) {
    openAnimeModal();
  }
  
  // Botón de Cerrar o Cancelar Modal
  if (target.closest('#btn-close-modal') || target.closest('#btn-cancel-modal')) {
    closeAnimeModal();
  }

  // Botón de Edición: carga el anime del estado y abre el modal prellenado
  const editBtn = target.closest('.btn-edit-anime');
  if (editBtn) {
    const id = editBtn.getAttribute('data-id');
    const anime = state.animes.find(a => a.id === id);
    if (anime) openAnimeModal(anime);
  }

  // Botón de Eliminación: solicita confirmación y borra el recurso en la API
  const deleteBtn = target.closest('.btn-delete-anime');
  if (deleteBtn) {
    const id = deleteBtn.getAttribute('data-id');
    const anime = state.animes.find(a => a.id === id);
    if (anime && confirm(`¿Seguro que deseas eliminar "${anime.title}" de tu inventario?`)) {
      try {
        await apiDeleteAnime(id);
        state.animes = state.animes.filter(a => a.id !== id);
        showToast('Anime eliminado de tu colección.', 'success');
        updateDashboardContent();
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  }
});

/**
 * 3. MANEJADOR DE ENTRADA DE TEXTO (INPUT)
 * 
 * Escucha la escritura sobre la barra de búsqueda del Dashboard para actualizar
 * el término de búsqueda de forma reactiva y volver a dibujar la lista de animes.
 */
document.getElementById('app').addEventListener('input', (e) => {
  if (e.target.id === 'search-input') {
    state.searchTerm = e.target.value;
    updateDashboardContent();
  }
});

/**
 * 4. MANEJADOR DE CAMBIO DE OPCIONES (CHANGE)
 * 
 * Escucha los cambios en los selects desplegables del Dashboard para aplicar
 * filtros inmediatos por Estado y por Género de visualización de animes.
 */
document.getElementById('app').addEventListener('change', (e) => {
  if (e.target.id === 'filter-status') {
    state.filterStatus = e.target.value;
    updateDashboardContent();
  }
  if (e.target.id === 'filter-genre') {
    state.filterGenre = e.target.value;
    updateDashboardContent();
  }
});

// =========================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =========================================================================

// Ejecutar revisión de credenciales locales y enrutador al cargarse la página
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  router();
});

// Detectar cambios en la dirección hash de la ventana para navegar en la SPA
window.addEventListener('hashchange', router);
