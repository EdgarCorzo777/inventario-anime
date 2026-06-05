/**
 * MÓDULO DE SERVICIOS API (FETCH)
 * 
 * ¿Qué hace este archivo?
 * Centraliza la comunicación HTTP de la aplicación con la base de datos simulada (json-server).
 * Gestiona el registro de usuarios, el inicio de sesión y todas las operaciones CRUD del inventario.
 * 
 * ¿Cómo lo hace?
 * Utiliza funciones asíncronas (`async/await`) y la API `fetch` nativa del navegador para realizar
 * consultas GET (lecturas), POST (creaciones), PUT (actualizaciones completas) y DELETE (borrados).
 * Lanza excepciones descriptivas con `throw new Error` que luego son atrapadas en el controlador
 * principal para mostrar alertas al usuario.
 */

// Puerto local por defecto donde corre json-server
const API_URL = 'http://localhost:3000';

/**
 * Registra un nuevo usuario en la colección /users
 * Valida previamente que el nombre de usuario y correo no estén en uso.
 */
export async function apiRegister(username, email, password) {
  // Comprobar si el correo electrónico ya existe
  const checkEmail = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  const usersWithEmail = await checkEmail.json();
  if (usersWithEmail.length > 0) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  // Comprobar si el nombre de usuario ya está en uso
  const checkUsername = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}`);
  const usersWithUsername = await checkUsername.json();
  if (usersWithUsername.length > 0) {
    throw new Error('El nombre de usuario ya está en uso.');
  }

  // Enviar petición POST para guardar el nuevo registro de usuario
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  if (!response.ok) {
    throw new Error('Error al registrar el usuario en el servidor.');
  }
  
  return await response.json();
}

/**
 * Valida credenciales de login buscando coincidencia por username o por email
 */
export async function apiLogin(usernameOrEmail, password) {
  // Buscar usuario por nombre de usuario
  let response = await fetch(`${API_URL}/users?username=${encodeURIComponent(usernameOrEmail)}`);
  let users = await response.json();
  
  // Si no se encuentra, intentar buscar por correo electrónico
  if (users.length === 0) {
    response = await fetch(`${API_URL}/users?email=${encodeURIComponent(usernameOrEmail)}`);
    users = await response.json();
  }
  
  // Validaciones de credenciales incorrectas
  if (users.length === 0) {
    throw new Error('El usuario o correo electrónico no existe.');
  }
  
  const user = users[0];
  if (user.password !== password) {
    throw new Error('Contraseña incorrecta.');
  }
  
  return user;
}

/**
 * Obtiene del servidor todos los animes registrados pertenecientes al ID de usuario
 */
export async function apiGetAnimes(userId) {
  const response = await fetch(`${API_URL}/animes?userId=${userId}`);
  if (!response.ok) {
    throw new Error('No se pudo cargar la lista de animes.');
  }
  return await response.json();
}

/**
 * Guarda un nuevo anime vinculando su autoría mediante 'userId'
 */
export async function apiCreateAnime(animeData) {
  const response = await fetch(`${API_URL}/animes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animeData)
  });
  if (!response.ok) {
    throw new Error('No se pudo registrar el anime.');
  }
  return await response.json();
}

/**
 * Sobrescribe un anime existente buscando por su ID
 */
export async function apiUpdateAnime(animeId, animeData) {
  const response = await fetch(`${API_URL}/animes/${animeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animeData)
  });
  if (!response.ok) {
    throw new Error('No se pudo actualizar el anime.');
  }
  return await response.json();
}

/**
 * Elimina un registro de anime por su ID
 */
export async function apiDeleteAnime(animeId) {
  const response = await fetch(`${API_URL}/animes/${animeId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('No se pudo eliminar el anime de la base de datos.');
  }
  return true;
}
