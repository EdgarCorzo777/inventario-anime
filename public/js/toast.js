/**
 * MÓDULO DE NOTIFICACIONES (TOASTS)
 * 
 * ¿Qué hace este archivo?
 * Permite mostrar mensajes emergentes en la parte inferior derecha de la pantalla
 * para indicar si una acción (como crear un anime o loguearse) fue exitosa o falló.
 * 
 * ¿Cómo lo hace?
 * Utiliza manipulación directa del DOM creando un elemento 'div' de forma dinámica,
 * agregándole clases de estilos CSS con Tailwind (con colores verde o rojo según el resultado)
 * y destruyendo el elemento tras completar una animación temporizada de 3 segundos.
 */

export function showToast(message, type = 'success') {
  // Crear el nodo HTML del toast
  const toast = document.createElement('div');
  
  // Seleccionar color de fondo e ícono basándonos en si es éxito (success) o error
  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';
  
  // Clases CSS de Tailwind que definen su estilo visual (glassmorphism flotante) y animaciones de transición
  toast.className = `fixed bottom-5 right-5 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white font-medium transition-all duration-500 transform translate-y-10 opacity-0 z-50 ${bgColor}`;
  
  // Estructura interna de texto e icono Font Awesome
  toast.innerHTML = `<i class="fa-solid ${icon} text-xl"></i><span>${message}</span>`;
  
  // Inserción directa en el DOM (cuerpo del documento)
  document.body.appendChild(toast);
  
  // Ejecutar animación de entrada suavizada (quitando el desplazamiento y activando la opacidad)
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);
  
  // Programar la animación de salida y eliminación física del nodo del DOM después de 3 segundos
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 500); // 500ms corresponde a la duración de la transición CSS
  }, 3000);
}
