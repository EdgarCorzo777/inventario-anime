/**
 * MÓDULO DE INTERFAZ Y VISTAS (DOM TEMPLATES)
 * 
 * ¿Qué hace este archivo?
 * Contiene todas las plantillas HTML (templates) de la aplicación y gestiona la representación
 * visual de las pantallas (Login, Registro, Dashboard, Modal) inyectándolas en el DOM de forma dinámica.
 * 
 * ¿Cómo lo hace?
 * Exporta funciones que retornan cadenas de texto con plantillas HTML y clases de Tailwind CSS.
 * Además, provee funciones específicas para actualizar datos de las tarjetas en tiempo real basándose
 * en el estado global (`state`) e interactuar con el formulario emergente (modal).
 */

import { state } from './state.js';

/**
 * RENDERIZACIÓN DE NAVEGACIÓN (HEADER) Y PIE DE PÁGINA (FOOTER)
 * 
 * Generan la barra de herramientas superior (Navbar) que muestra el nombre de la app,
 * el usuario activo y el botón de cerrar sesión; y la firma inferior del sitio.
 */
export function renderHeader() {
  if (!state.user) return '';
  return `
    <header class="glass-card sticky top-0 z-40 w-full px-6 py-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Logotipo de la Aplicación -->
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-md shadow-indigo-500/20">
            <i class="fa-solid fa-clapperboard text-2xl text-white"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">AnimeKeep</h1>
            <p class="text-xs text-slate-400">Tu colección personal de anime</p>
          </div>
        </div>
        <!-- Menú de Usuario Logueado y Cierre de Sesión -->
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2.5 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-xl">
            <i class="fa-solid fa-user-circle text-indigo-400 text-lg"></i>
            <span class="text-sm font-medium text-slate-200">Hola, <span class="text-white font-bold">${state.user.username}</span></span>
          </div>
          <button id="btn-logout" class="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-4 py-2 rounded-xl border border-rose-500/20 hover:border-transparent transition-all duration-300 text-sm font-semibold cursor-pointer">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer class="w-full py-6 mt-12 border-t border-slate-800/80 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-6">
        <p>© 2026 AnimeKeep. Construido con Vanilla JS y Tailwind CSS.</p>
        <p class="mt-1 text-slate-600">Servidor backend simulado por json-server.</p>
      </div>
    </footer>
  `;
}

/**
 * FORMULARIO DE INICIO DE SESIÓN (LOGIN)
 * 
 * Retorna la vista con los campos requeridos para acceder a la aplicación.
 * Cuenta con efectos estéticos de degradado y cristal translúcido (glass-card).
 */
export function viewLogin() {
  return `
    <div class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden text-left">
        <!-- Luces Decorativas de Fondo -->
        <div class="absolute -top-12 -left-12 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>

        <div class="text-center mb-8 relative z-10">
          <div class="inline-block bg-gradient-to-tr from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/25 mb-4">
            <i class="fa-solid fa-clapperboard text-3xl text-white"></i>
          </div>
          <h2 class="text-3xl font-extrabold text-white">¡Bienvenido de nuevo!</h2>
          <p class="text-sm text-slate-400 mt-2">Inicia sesión para acceder a tu inventario de anime</p>
        </div>

        <form id="login-form" class="space-y-6 relative z-10">
          <div>
            <label for="login-username" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Usuario o Email</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><i class="fa-solid fa-user"></i></span>
              <input type="text" id="login-username" required class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" placeholder="Ej: otaku o otaku@example.com">
            </div>
          </div>

          <div>
            <label for="login-password" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contraseña</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><i class="fa-solid fa-lock"></i></span>
              <input type="password" id="login-password" required class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" placeholder="••••••••">
            </div>
          </div>

          <button type="submit" class="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            <i class="fa-solid fa-right-to-bracket mr-2"></i>Iniciar Sesión
          </button>
        </form>

        <div class="mt-8 text-center text-sm text-slate-400 relative z-10">
          ¿No tienes una cuenta? 
          <a href="#/register" class="text-indigo-400 hover:text-indigo-300 font-bold hover:underline ml-1">Regístrate aquí</a>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

/**
 * FORMULARIO DE REGISTRO DE CUENTA
 * 
 * Genera la vista con los campos nombre de usuario, correo electrónico y contraseña.
 */
export function viewRegister() {
  return `
    <div class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden text-left">
        <div class="absolute -top-12 -left-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>

        <div class="text-center mb-8 relative z-10">
          <div class="inline-block bg-gradient-to-tr from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-purple-500/25 mb-4">
            <i class="fa-solid fa-user-plus text-3xl text-white"></i>
          </div>
          <h2 class="text-3xl font-extrabold text-white">Crea tu Cuenta</h2>
          <p class="text-sm text-slate-400 mt-2">Comienza a organizar tu colección de anime ahora mismo</p>
        </div>

        <form id="register-form" class="space-y-5 relative z-10">
          <div>
            <label for="reg-username" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nombre de Usuario</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><i class="fa-solid fa-user"></i></span>
              <input type="text" id="reg-username" required class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" placeholder="Ej: mi_usuario_otaku">
            </div>
          </div>

          <div>
            <label for="reg-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Correo Electrónico</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><i class="fa-solid fa-envelope"></i></span>
              <input type="email" id="reg-email" required class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" placeholder="Ej: correo@servidor.com">
            </div>
          </div>

          <div>
            <label for="reg-password" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contraseña</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><i class="fa-solid fa-lock"></i></span>
              <input type="password" id="reg-password" required minlength="6" class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" placeholder="Mínimo 6 caracteres">
            </div>
          </div>

          <button type="submit" class="w-full py-3.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            <i class="fa-solid fa-circle-check mr-2"></i>Registrar Cuenta
          </button>
        </form>

        <div class="mt-8 text-center text-sm text-slate-400 relative z-10">
          ¿Ya tienes una cuenta? 
          <a href="#/login" class="text-indigo-400 hover:text-indigo-300 font-bold hover:underline ml-1">Inicia sesión aquí</a>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

/**
 * MAQUETACIÓN INICIAL DEL DASHBOARD
 * 
 * Inyecta la estructura principal de navegación y establece la plantilla de carga (spinner)
 * que se muestra mientras se consumen los datos del inventario de animes.
 */
export function viewDashboardHTML() {
  return `
    ${renderHeader()}
    <main class="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
      <!-- Indicador de carga asíncrona -->
      <div id="loader" class="flex flex-col items-center justify-center py-20 space-y-4">
        <i class="fa-solid fa-spinner fa-spin text-4xl text-indigo-500"></i>
        <p class="text-slate-400 font-medium">Cargando tu colección de anime...</p>
      </div>
      <!-- Espacio reservado para inyectar dinámicamente el listado y las estadísticas -->
      <div id="dashboard-content" class="hidden space-y-8 text-left"></div>
    </main>
    ${renderFooter()}
  `;
}

/**
 * ACTUALIZADOR DE INTERFAZ DEL DASHBOARD
 * 
 * Calcula las estadísticas (totales, calificaciones y estados) basadas en el estado actual,
 * filtra la lista de animes por los campos de búsqueda o selects correspondientes,
 * y genera la cuadrícula de tarjetas de animes de forma reactiva en el DOM.
 */
// Dibuja el listado de tarjetas de anime filtrado en el contenedor correspondiente sin destruir los controles
export function renderAnimeList() {
  const listContainer = document.getElementById('anime-list-container');
  if (!listContainer) return;

  // Filtrado de animes según los filtros de búsqueda, estado y género activos
  const filteredAnimes = state.animes.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
                          anime.genre.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesStatus = state.filterStatus === 'todos' || anime.status === state.filterStatus;
    const matchesGenre = state.filterGenre === 'todos' || anime.genre.toLowerCase().includes(state.filterGenre.toLowerCase());
    return matchesSearch && matchesStatus && matchesGenre;
  });

  // Mostrar mensaje en caso de no encontrar coincidencias
  if (filteredAnimes.length === 0) {
    listContainer.innerHTML = `
      <div class="glass-card text-center py-20 px-4 rounded-2xl flex flex-col items-center justify-center">
        <div class="bg-slate-800/80 w-16 h-16 rounded-full flex items-center justify-center text-slate-500 text-2xl mb-4 border border-slate-700/40">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No se encontraron animes</h3>
        <p class="text-slate-400 max-w-md">Tu lista de animes está vacía o ningún registro coincide con los filtros aplicados. ¡Prueba a agregar o buscar otro término!</p>
      </div>
    `;
    return;
  }

  // Renderizar la cuadrícula con las tarjetas de animes
  listContainer.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${filteredAnimes.map(anime => {
        let badgeColor = '';
        if (anime.status === 'Completado') {
          badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        } else if (anime.status === 'Viendo') {
          badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/20';
        } else {
          badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }

        return `
          <div class="glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group border border-slate-800/80 hover:border-slate-700/80">
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between gap-2">
                <span class="px-3 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${badgeColor}">
                  ${anime.status}
                </span>
                <div class="flex items-center gap-1 text-rose-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                  <i class="fa-solid fa-star"></i>
                  <span>${anime.rating > 0 ? anime.rating : '-'} / 10</span>
                </div>
              </div>

              <div>
                <h3 class="text-xl font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors duration-300">${anime.title}</h3>
                <p class="text-xs text-slate-400 mt-1.5 flex flex-wrap gap-1.5">
                  ${anime.genre.split(',').map(g => `<span class="bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50">${g.trim()}</span>`).join('')}
                </p>
              </div>

              <p class="text-slate-400 text-sm leading-relaxed line-clamp-3">
                ${anime.synopsis || 'Sin descripción disponible.'}
              </p>

              <div class="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                <i class="fa-solid fa-film text-slate-500 text-sm"></i>
                <span class="text-sm font-semibold text-slate-300">${anime.episodes} <span class="font-normal text-slate-400">Episodios</span></span>
              </div>
            </div>

            <div class="px-6 py-4 bg-slate-900/30 border-t border-slate-800/80 grid grid-cols-2 gap-3">
              <button class="btn-edit-anime bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white px-3 py-2 rounded-xl border border-slate-700/50 hover:border-transparent transition-all duration-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer" data-id="${anime.id}">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Editar</span>
              </button>
              <button class="btn-delete-anime bg-slate-800 hover:bg-rose-600/90 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-700/50 hover:border-transparent transition-all duration-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer" data-id="${anime.id}">
                <i class="fa-solid fa-trash-can"></i>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Dibuja la estructura estática del Dashboard (estadísticas y buscador) y refresca la lista de animes
export function updateDashboardContent() {
  const content = document.getElementById('dashboard-content');
  if (!content) return;

  // Cálculos estadísticos para toda la colección del usuario
  const totalAnimes = state.animes.length;
  const watchingCount = state.animes.filter(a => a.status === 'Viendo').length;
  const completedCount = state.animes.filter(a => a.status === 'Completado').length;
  const pendingCount = state.animes.filter(a => a.status === 'Pendiente').length;

  const gradedAnimes = state.animes.filter(a => a.rating > 0);
  const sumRatings = gradedAnimes.reduce((sum, curr) => sum + Number(curr.rating), 0);
  const avgRating = gradedAnimes.length > 0 ? (sumRatings / gradedAnimes.length).toFixed(1) : '0.0';

  // Obtener listado de géneros únicos para llenar los filtros dropdown
  const allGenres = new Set();
  state.animes.forEach(anime => {
    anime.genre.split(',').forEach(g => {
      const trimmed = g.trim();
      if (trimmed) allGenres.add(trimmed);
    });
  });

  // Si no se ha dibujado el esqueleto básico, lo creamos
  if (!document.getElementById('anime-list-container')) {
    content.innerHTML = `
      <!-- PANEL DE ESTADÍSTICAS -->
      <section class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div class="bg-indigo-500/10 text-indigo-400 p-3.5 rounded-xl border border-indigo-500/20 text-xl flex items-center justify-center">
            <i class="fa-solid fa-list-ul"></i>
          </div>
          <div>
            <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Total Animes</span>
            <span id="stat-total" class="text-2xl font-black text-white">${totalAnimes}</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div class="bg-sky-500/10 text-sky-400 p-3.5 rounded-xl border border-sky-500/20 text-xl flex items-center justify-center">
            <i class="fa-solid fa-play"></i>
          </div>
          <div>
            <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Viendo</span>
            <span id="stat-watching" class="text-2xl font-black text-white">${watchingCount}</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div class="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl border border-emerald-500/20 text-xl flex items-center justify-center">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Completados</span>
            <span id="stat-completed" class="text-2xl font-black text-white">${completedCount}</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div class="bg-amber-500/10 text-amber-400 p-3.5 rounded-xl border border-amber-500/20 text-xl flex items-center justify-center">
            <i class="fa-solid fa-clock"></i>
          </div>
          <div>
            <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Pendientes</span>
            <span id="stat-pending" class="text-2xl font-black text-white">${pendingCount}</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl flex items-center gap-4 col-span-2 lg:col-span-1">
          <div class="bg-rose-500/10 text-rose-400 p-3.5 rounded-xl border border-rose-500/20 text-xl flex items-center justify-center">
            <i class="fa-solid fa-star"></i>
          </div>
          <div>
            <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Nota Media</span>
            <span id="stat-avg" class="text-2xl font-black text-white">${avgRating} <span class="text-xs font-normal text-slate-400">/10</span></span>
          </div>
        </div>
      </section>

      <!-- ACCIONES DE BÚSQUEDA Y FILTRADO -->
      <section class="glass-card p-6 rounded-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div class="relative w-full lg:max-w-xs">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" id="search-input" class="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm" placeholder="Buscar por título o género..." value="${state.searchTerm}">
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
          <select id="filter-status" class="bg-slate-900 border border-slate-700/60 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="todos" ${state.filterStatus === 'todos' ? 'selected' : ''}>Todos los Estados</option>
            <option value="Viendo" ${state.filterStatus === 'Viendo' ? 'selected' : ''}>Viendo</option>
            <option value="Completado" ${state.filterStatus === 'Completado' ? 'selected' : ''}>Completado</option>
            <option value="Pendiente" ${state.filterStatus === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          </select>

          <select id="filter-genre" class="bg-slate-900 border border-slate-700/60 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="todos" ${state.filterGenre === 'todos' ? 'selected' : ''}>Todos los Géneros</option>
            ${Array.from(allGenres).map(g => `<option value="${g}" ${state.filterGenre === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>

          <button id="btn-add-anime" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-300 text-sm cursor-pointer w-full sm:w-auto">
            <i class="fa-solid fa-plus text-sm"></i>
            <span>Agregar Anime</span>
          </button>
        </div>
      </section>

      <!-- CONTENEDOR DINÁMICO DE TARJETAS (EVITA RE-RENDERIZAR EL BUSCADOR) -->
      <section id="anime-list-container" class="mt-8"></section>
    `;
  } else {
    // Si ya existe el esqueleto, solo actualizamos los valores de texto de las estadísticas
    document.getElementById('stat-total').textContent = totalAnimes;
    document.getElementById('stat-watching').textContent = watchingCount;
    document.getElementById('stat-completed').textContent = completedCount;
    document.getElementById('stat-pending').textContent = pendingCount;
    document.getElementById('stat-avg').innerHTML = `${avgRating} <span class="text-xs font-normal text-slate-400">/10</span>`;

    // Actualizamos el dropdown de géneros por si se ha agregado algún género nuevo en el CRUD
    const genreSelect = document.getElementById('filter-genre');
    if (genreSelect) {
      genreSelect.innerHTML = `
        <option value="todos" ${state.filterGenre === 'todos' ? 'selected' : ''}>Todos los Géneros</option>
        ${Array.from(allGenres).map(g => `<option value="${g}" ${state.filterGenre === g ? 'selected' : ''}>${g}</option>`).join('')}
      `;
    }
  }

  // Mandamos a renderizar la lista de tarjetas en el contenedor dinámico
  renderAnimeList();
}

/**
 * FORMULARIO MODAL INTERACTIVO PARA CREAR / EDITAR ANIME
 * 
 * Crea un contenedor de pantalla completa semitransparente con un cuadro modal centrado.
 * Si se pasa el objeto 'anime', prellena los inputs del formulario y entra en modo de edición.
 */
export function openAnimeModal(anime = null) {
  state.currentAnimeToEdit = anime;
  const isEdit = !!anime;
  
  const title = isEdit ? anime.title : '';
  const genre = isEdit ? anime.genre : '';
  const episodes = isEdit ? anime.episodes : 0;
  const status = isEdit ? anime.status : 'Pendiente';
  const rating = isEdit ? anime.rating : 0;
  const synopsis = isEdit ? anime.synopsis : '';

  const modalContainer = document.createElement('div');
  modalContainer.id = 'anime-modal';
  modalContainer.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300';

  modalContainer.innerHTML = `
    <div class="glass-modal w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col text-left">
      <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <i class="fa-solid ${isEdit ? 'fa-pen-to-square text-indigo-400' : 'fa-circle-plus text-indigo-400'}"></i>
          <span>${isEdit ? 'Editar Anime' : 'Agregar Nuevo Anime'}</span>
        </h3>
        <button id="btn-close-modal" class="text-slate-400 hover:text-white transition-colors text-xl cursor-pointer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form id="anime-form" class="p-6 space-y-5 overflow-y-auto flex-grow">
        <div>
          <label for="anime-title" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Título del Anime</label>
          <input type="text" id="anime-title" required class="block w-full px-4 py-2.5 bg-slate-900 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Attack on Titan" value="${title}">
        </div>

        <div>
          <label for="anime-genre" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Géneros (Separados por coma)</label>
          <input type="text" id="anime-genre" required class="block w-full px-4 py-2.5 bg-slate-900 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Acción, Drama, Misterio" value="${genre}">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="anime-episodes" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nº de Episodios</label>
            <input type="number" id="anime-episodes" min="0" required class="block w-full px-4 py-2.5 bg-slate-900 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" value="${episodes}">
          </div>

          <div>
            <label for="anime-status" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Estado de visualización</label>
            <select id="anime-status" required class="block w-full px-4 py-2.5 bg-slate-900 border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <option value="Pendiente" ${status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
              <option value="Viendo" ${status === 'Viendo' ? 'selected' : ''}>Viendo</option>
              <option value="Completado" ${status === 'Completado' ? 'selected' : ''}>Completado</option>
            </select>
          </div>
        </div>

        <div>
          <label for="anime-rating" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Calificación (0 a 10)</label>
          <div class="flex items-center gap-3">
            <input type="range" id="anime-rating" min="0" max="10" step="1" class="w-full accent-indigo-500 cursor-pointer" value="${rating}">
            <span id="rating-value" class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg font-bold text-sm min-w-[3rem] text-center">${rating}</span>
          </div>
        </div>

        <div>
          <label for="anime-synopsis" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sinopsis o Notas personales</label>
          <textarea id="anime-synopsis" rows="3" class="block w-full px-4 py-2.5 bg-slate-900 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Escribe aquí la sinopsis...">${synopsis}</textarea>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 justify-end">
          <button type="button" id="btn-cancel-modal" class="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl border border-slate-700/50 hover:border-transparent transition-all duration-300 text-sm font-semibold cursor-pointer w-full sm:w-auto text-center">
            Cancelar
          </button>
          <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-300 text-sm cursor-pointer w-full sm:w-auto text-center">
            ${isEdit ? 'Guardar Cambios' : 'Registrar Anime'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('app').appendChild(modalContainer);

  // Listener para sincronizar el slider de calificación con el texto numérico en pantalla
  const rangeInput = document.getElementById('anime-rating');
  const ratingVal = document.getElementById('rating-value');
  if (rangeInput && ratingVal) {
    rangeInput.addEventListener('input', (e) => {
      ratingVal.textContent = e.target.value;
    });
  }

  // Animación de escala y opacidad al abrir
  setTimeout(() => {
    modalContainer.querySelector('.glass-modal').classList.remove('scale-95');
  }, 10);
}

/**
 * CIERRE DE VENTANA MODAL
 * 
 * Agrega efectos de achicamiento y desvanecimiento antes de remover físicamente la modal del DOM.
 */
export function closeAnimeModal() {
  const modal = document.getElementById('anime-modal');
  if (modal) {
    modal.querySelector('.glass-modal').classList.add('scale-95');
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.remove();
      state.currentAnimeToEdit = null;
    }, 300);
  }
}
