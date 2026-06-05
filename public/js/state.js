/**
 * ESTADO GLOBAL DE LA APLICACIÓN (MÓDULO STATE)
 * 
 * ¿Qué hace este archivo?
 * Centraliza los datos en memoria de la aplicación para que todos los demás módulos
 * importen y trabajen sobre la misma información (una única fuente de verdad).
 * 
 * ¿Cómo lo hace?
 * Define y exporta un objeto de JavaScript con valores por defecto que se actualizan
 * durante la navegación del usuario (datos del usuario logueado, animes descargados y filtros activos).
 */

export const state = {
  // Guarda los datos del usuario logueado (ej: id, username, email). Es null si no está autenticado.
  user: null,
  
  // Array que contendrá la lista completa de animes del usuario actual cargados desde json-server.
  animes: [],
  
  // Objeto del anime que se va a editar. Si es null, el formulario/modal actúa en modo creación.
  currentAnimeToEdit: null,
  
  // Texto de búsqueda ingresado en el input para filtrar la lista de animes.
  searchTerm: '',
  
  // Estado del filtro de visualización ('todos', 'Viendo', 'Completado', 'Pendiente').
  filterStatus: 'todos',
  
  // Estado del filtro de género ('todos' o algún género extraído del inventario).
  filterGenre: 'todos'
};
