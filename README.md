# AnimeKeep - Gestor de Inventario de Anime (SPA)

¡Bienvenido a **AnimeKeep**! Este es un proyecto de aprendizaje diseñado al nivel de un desarrollador **Junior**, con el propósito de entender y dominar las bases del desarrollo web moderno utilizando **JavaScript Vanilla (puro)** sin depender de frameworks de frontend (como React, Vue o Angular).

La aplicación es una **SPA (Single Page Application)** completa con autenticación, persistencia de sesión, operaciones CRUD y filtros avanzados en tiempo real, utilizando **Tailwind CSS v4** para un diseño moderno y responsivo, y **json-server** como base de datos y servidor web unificado.

---

## 🚀 Características Clave del Proyecto

- **Navegación SPA por Hash:** El enrutamiento se maneja directamente en el cliente detectando el hash de la URL (`#/login`, `#/dashboard`, etc.), cargando las vistas dinámicamente sin recargar la página.
- **Rutas Protegidas:** Bloquea de forma segura el acceso al panel principal a usuarios no autenticados y redirige de forma automática.
- **Persistencia de Sesión:** Mantiene al usuario conectado guardando de forma segura su información en el `localStorage` del navegador.
- **CRUD Completo mediante Modales:** Permite agregar, editar o eliminar registros de anime interactuando de forma limpia con la API de `json-server`.
- **Filtros e Inputs No Destructivos:** Un buscador por texto y selects desplegables que filtran las tarjetas de anime instantáneamente en el DOM sin perder el foco del teclado.
- **Estadísticas Dinámicas:** Calcula en tiempo real datos globales de tu colección (total de animes, completados, pendientes, viendo y nota media general).
- **Notificaciones Flotantes (Toasts):** Mensajes temporales visuales de éxito o error para una experiencia de usuario fluida y premium.

---

## 🛠️ Tecnologías Utilizadas

1. **Frontend:**
   - **HTML5** semántico y estructurado.
   - **Tailwind CSS v4** (a través de su Play CDN moderna, configurando variables tipográficas en el bloque de estilos con CSS nativo `@theme`).
   - **Font Awesome 6** para la librería de íconos interactivos.
   - **JavaScript Vanilla (ES6+)** estructurado bajo el estándar moderno de **ES Modules** (`import` / `export` nativos).
2. **Backend / Servidor:**
   - **json-server v1+** para simular una base de datos RESTful local a través del archivo `db.json` y servir de manera unificada los archivos estáticos del frontend.

---

## 📁 Estructura del Proyecto

El proyecto se mantiene ligero y organizado en módulos limpios:

```
inventario-anime/
├── db.json               # Base de datos local (colecciones de users y animes)
├── package.json          # Script de arranque del servidor
├── README.md             # Guía de documentación del proyecto
└── public/               # Directorio público del cliente
    ├── index.html        # Plantilla base (carga Tailwind v4 y enlaza app.js)
    ├── app.js            # Punto de entrada: Enrutador, sesión y delegación de eventos
    └── js/               # Submódulos independientes
        ├── state.js      # Estado único en memoria (fuente de verdad)
        ├── api.js        # Comunicación asíncrona fetch con json-server
        ├── toast.js      # Lógica de creación/destrucción de toasts
        └── views.js      # Vistas HTML dinámicas y lógica del modal CRUD
```

---

## ⚙️ Instalación y Arranque del Proyecto

Para mantener el proyecto libre de carpetas pesadas como `node_modules` en tu espacio local, la aplicación se ejecuta haciendo uso de `npx` (que viene preinstalado con Node.js). 

### Requisitos Previos:
- Tener instalado [Node.js](https://nodejs.org/) en tu máquina.

### Pasos para Ejecutar:

1. Abre tu terminal de comandos dentro del directorio raíz del proyecto.
2. Inicia la aplicación ejecutando:
   ```bash
   npm start
   ```
   *(Este script ejecuta internamente `npx json-server --watch db.json --port 3000 --static ./public`, levantando la API REST y sirviendo la interfaz en el mismo puerto al vuelo)*.

3. Abre tu navegador e ingresa a: **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Cuenta de Prueba por Defecto

Para que puedas interactuar con la aplicación de inmediato, se incluye una cuenta con datos precargados en `db.json`:

- **Usuario o Email:** `admin`
- **Contraseña:** `admin123`

*(También puedes usar el enlace de "Registro" para crear nuevas cuentas locales).*

---

## 🎓 Aprendizaje Clave para Desarrolladores Junior

Este código sirve de base de estudio para entender:
1. **Delegación de Eventos:** En lugar de poner un escuchador (`addEventListener`) a cada botón o tarjeta creada, agregamos un único escuchador en el padre `#app` y filtramos con `e.target.closest()`. Esto evita fugas de memoria y mantiene activos los clicks en elementos que se inyectan dinámicamente.
2. **Burbujeo del DOM:** Entender por qué los elementos dinámicos (como un modal) deben colgarse dentro de `#app` si queremos que la delegación de eventos del contenedor principal los detecte.
3. **Tipado Estricto de APIs:** Comprender cómo el backend (json-server) puede hacer distinciones de tipo en las consultas (string vs. number), y cómo convertir valores de texto de inputs a enteros (`Number(id)`) para evitar que las búsquedas fallen en la API.
4. **Modulos Nativos (ES Modules):** Cómo estructurar y enlazar archivos en la web moderna usando `type="module"` sin necesidad de bundlers como Webpack o Vite.