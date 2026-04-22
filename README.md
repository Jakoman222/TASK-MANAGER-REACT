<!-- ## Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html) -->

# 📝 Task Manager App (Full Stack)

Aplicación full stack para la gestión de tareas, desarrollada con un enfoque moderno utilizando React en el frontend, Node.js con Express en el backend y PostgreSQL como base de datos, gestionada mediante Prisma ORM.

---

## 🚀 Tecnologías utilizadas

### 🔹 Frontend
- React
- Fetch API
- Despliegue en Vercel

### 🔹 Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT) para autenticación
- Despliegue en Render

### 🔹 Base de datos
- PostgreSQL
- Prisma ORM

---

## 🧩 Arquitectura del proyecto

El proyecto sigue una arquitectura cliente-servidor:

1. El usuario interactúa con la interfaz en React.
2. El frontend envía peticiones HTTP al backend.
3. El backend procesa la lógica con Express.
4. Prisma gestiona la comunicación con PostgreSQL.
5. El backend responde con datos en formato JSON.
6. React actualiza la interfaz dinámicamente.

---

## 🔐 Autenticación con JWT

El sistema implementa autenticación basada en tokens:

1. El usuario inicia sesión (`POST /login`)
2. El backend valida las credenciales y genera un token JWT
3. El token se almacena en el cliente (localStorage)
4. Para acceder a rutas protegidas, se envía:

```http
Authorization: Bearer TOKEN