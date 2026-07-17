---
# 📝 Task Manager App — Full Stack

Aplicación full stack para la gestión de tareas, desarrollada con React, Node.js, Express, PostgreSQL y Prisma ORM.

El proyecto implementa una arquitectura cliente-servidor, persistencia de datos, autenticación básica con JSON Web Tokens, pruebas automatizadas, integración continua y ejecución local mediante Docker Compose.

[![CI](https://github.com/Jakoman222/TASK-MANAGER-REACT/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Jakoman222/TASK-MANAGER-REACT/actions/workflows/ci.yml)

---

## 🚀 Demostración

* **Frontend:** desplegado en Vercel
* **Backend:** desplegado en Render
* **Base de datos de producción:** PostgreSQL en Neon

> Agrega aquí los enlaces públicos del frontend y del backend cuando quieras mostrarlos directamente en tu portafolio.

---

## 📌 Descripción

Task Manager App permite crear, visualizar, actualizar y eliminar tareas desde una interfaz web.

El frontend consume una API REST construida con Express. El backend procesa las solicitudes y utiliza Prisma ORM para comunicarse con una base de datos PostgreSQL.

El proyecto fue desarrollado para practicar e integrar conceptos de desarrollo full stack, bases de datos, autenticación, testing, CI/CD, contenedores y despliegue en la nube.

---

## ✨ Funcionalidades

* Crear nuevas tareas.
* Listar tareas almacenadas.
* Marcar tareas como completadas o pendientes.
* Eliminar tareas.
* Persistir información en PostgreSQL.
* Consumir una API REST desde React.
* Autenticación básica mediante JSON Web Tokens.
* Ruta privada protegida mediante middleware.
* Pruebas unitarias del frontend.
* Pruebas end-to-end con Playwright.
* Integración continua mediante GitHub Actions.
* Ejecución local de toda la aplicación mediante Docker Compose.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* Vite
* JavaScript
* Fetch API
* CSS
* Vitest
* React Testing Library
* Nginx para servir la aplicación compilada
* Vercel para despliegue

### Backend

* Node.js
* Express.js
* TypeScript
* JSON Web Tokens
* Prisma ORM
* PostgreSQL
* Render para despliegue

### Base de datos

* PostgreSQL
* Prisma Migrate
* Neon en producción
* PostgreSQL local mediante Docker para desarrollo

### DevOps y testing

* Docker
* Docker Compose
* GitHub Actions
* Playwright
* Vitest
* Integración continua en cada push o pull request hacia `main`

---

## 🧩 Arquitectura

El proyecto sigue una arquitectura cliente-servidor:

```text
Usuario
   │
   ▼
Frontend React
   │ Peticiones HTTP
   ▼
API REST con Express
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

Flujo principal:

1. El usuario interactúa con la interfaz desarrollada en React.
2. El frontend envía solicitudes HTTP al backend.
3. Express recibe y procesa las solicitudes.
4. Prisma ejecuta las operaciones sobre PostgreSQL.
5. El backend devuelve una respuesta en formato JSON.
6. React actualiza la interfaz con los datos recibidos.

---

## 📂 Estructura del proyecto

```text
TASK-MANAGER-REACT/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── vite.config.js
├── tests/
├── docker-compose.yml
├── playwright.config.ts
├── .env.example
├── .gitignore
└── README.md
```

---

## 🐳 Ejecución local con Docker

### Requisitos

Antes de iniciar el proyecto, necesitas:

* Git
* Docker
* Docker Compose

No es necesario instalar manualmente Node.js, PostgreSQL, Prisma ni Nginx.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jakoman222/TASK-MANAGER-REACT.git
cd TASK-MANAGER-REACT
```

### 2. Crear las variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

El archivo `.env` debe contener:

```env
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppass
POSTGRES_DB=appdb

DATABASE_URL=postgresql://appuser:apppass@postgres:5432/appdb

VITE_API_URL=http://localhost:3000
```

Estas credenciales corresponden únicamente a la base de datos local creada por Docker.

### 3. Construir y levantar los servicios

```bash
docker compose up --build
```

Durante el inicio:

1. Docker crea el contenedor de PostgreSQL.
2. El backend espera hasta que PostgreSQL esté disponible.
3. Prisma ejecuta las migraciones pendientes.
4. El backend inicia la API.
5. El frontend se compila y se sirve mediante Nginx.

---

## 🌐 Puertos locales

| Servicio   | Dirección               | Descripción                            |
| ---------- | ----------------------- | -------------------------------------- |
| Frontend   | `http://localhost:5173` | Aplicación React servida con Nginx     |
| Backend    | `http://localhost:3000` | API REST con Node.js y Express         |
| PostgreSQL | `localhost:5433`        | Acceso desde la computadora anfitriona |

Dentro de la red de Docker, el backend se conecta a PostgreSQL mediante:

```text
postgres:5432
```

`postgres` es el nombre del servicio definido en `docker-compose.yml`.

---

## ⏹️ Detener la aplicación

Detener los contenedores:

```bash
docker compose down
```

Detener los contenedores y eliminar también la base de datos local:

```bash
docker compose down -v
```

> `docker compose down -v` elimina el volumen de PostgreSQL y todos los datos almacenados localmente.

Para revisar los contenedores activos:

```bash
docker compose ps
```

Para observar los registros:

```bash
docker compose logs -f
```

---

## 🔌 API REST

### Tareas

| Método   | Ruta         | Descripción              |
| -------- | ------------ | ------------------------ |
| `GET`    | `/tasks`     | Obtener todas las tareas |
| `POST`   | `/tasks`     | Crear una tarea          |
| `PUT`    | `/tasks/:id` | Actualizar una tarea     |
| `DELETE` | `/tasks/:id` | Eliminar una tarea       |

Ejemplo de creación:

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "text": "Aprender Docker Compose",
  "completed": false
}
```

### Autenticación

| Método | Ruta       | Descripción                  |
| ------ | ---------- | ---------------------------- |
| `POST` | `/login`   | Generar un token JWT         |
| `GET`  | `/private` | Acceder a una ruta protegida |

Para acceder a una ruta protegida:

```http
Authorization: Bearer TOKEN
```

---

## 🔐 Variables de entorno

### Backend

```env
DATABASE_URL=
PORT=3000
SECRET_KEY=
```

### Frontend

```env
VITE_API_URL=
```

Las variables que comienzan con `VITE_` se incorporan al frontend durante la compilación y pueden ser visibles desde el navegador.

Por esta razón, nunca deben utilizarse para almacenar:

* Contraseñas.
* Tokens privados.
* Credenciales de bases de datos.
* Claves secretas.

Los archivos `.env` reales no deben subirse al repositorio.

---

## 🧪 Pruebas automatizadas

### Pruebas unitarias del frontend

Las pruebas del frontend utilizan Vitest y React Testing Library.

```bash
cd frontend
npm ci
npx vitest run
```

Para ejecutar las pruebas con cobertura:

```bash
npx vitest run --coverage
```

### Pruebas end-to-end

Playwright verifica flujos completos desde el navegador, como la creación de una tarea y su visualización en la lista.

Desde la raíz del proyecto:

```bash
npm ci
npx playwright install chromium
npx playwright test --project=chromium
```

Para revisar el reporte:

```bash
npx playwright show-report
```

---

## 🔄 Integración continua

El proyecto utiliza GitHub Actions para ejecutar automáticamente:

* Compilación del frontend.
* Pruebas unitarias y cobertura.
* Compilación del backend.
* Pruebas end-to-end con Playwright.
* Generación de artefactos de cobertura y reportes.

El pipeline se ejecuta cuando se realiza:

* Un `push` hacia `main`.
* Un `pull request` dirigido a `main`.

Archivo principal:

```text
.github/workflows/ci.yml
```

---

## 💻 Ejecución sin Docker

También es posible ejecutar cada servicio manualmente.

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

En este modo debes configurar las variables de entorno correspondientes y tener acceso a una base PostgreSQL.

---

## 📜 Comandos principales

### Frontend

| Comando                     | Descripción                            |
| --------------------------- | -------------------------------------- |
| `npm run dev`               | Inicia Vite en modo desarrollo         |
| `npm run build`             | Genera la compilación de producción    |
| `npx vitest run`            | Ejecuta las pruebas unitarias          |
| `npx vitest run --coverage` | Ejecuta las pruebas y genera cobertura |

### Backend

| Comando                     | Descripción                               |
| --------------------------- | ----------------------------------------- |
| `npm run dev`               | Inicia el backend en modo desarrollo      |
| `npm run build`             | Compila TypeScript y genera Prisma Client |
| `npm start`                 | Ejecuta el backend compilado              |
| `npx prisma migrate deploy` | Aplica migraciones pendientes             |
| `npx prisma studio`         | Abre una interfaz para consultar la base  |

### Proyecto completo

| Comando                     | Descripción                                   |
| --------------------------- | --------------------------------------------- |
| `docker compose up --build` | Construye e inicia todos los servicios        |
| `docker compose down`       | Detiene los servicios                         |
| `docker compose down -v`    | Detiene los servicios y elimina la base local |
| `docker compose logs -f`    | Muestra los registros de los contenedores     |

---

## ☁️ Despliegue

La aplicación utiliza diferentes servicios para producción:

```text
Frontend → Vercel
Backend → Render
Base de datos → Neon PostgreSQL
```

En producción, las variables de entorno se configuran directamente en cada plataforma y no mediante los archivos `.env` locales.

---

## 🎯 Objetivos técnicos del proyecto

Este proyecto fue desarrollado para demostrar conocimientos en:

* Desarrollo frontend con React.
* Desarrollo de APIs REST con Express.
* TypeScript aplicado al backend.
* Modelado y persistencia con PostgreSQL.
* Uso de Prisma ORM y migraciones.
* Comunicación cliente-servidor mediante HTTP.
* Manejo de variables de entorno.
* Autenticación básica con JWT.
* Pruebas unitarias y end-to-end.
* Automatización con GitHub Actions.
* Contenerización con Docker.
* Despliegue de una aplicación full stack.

---

## 🗺️ Próximas mejoras

* Implementar autenticación completa desde el frontend.
* Asociar las tareas a usuarios individuales.
* Proteger todas las operaciones privadas.
* Incorporar validaciones más robustas.
* Mejorar el manejo de errores del frontend.
* Agregar edición del texto de una tarea.
* Implementar pruebas del backend con Supertest.
* Añadir una base de datos exclusiva para testing.
* Mejorar la accesibilidad de la interfaz.

---

## 👤 Autor

**Jaime Alejandro Condori Machaca**

Ingeniero Mecatrónico en transición hacia el desarrollo de software, con interés en desarrollo backend, automatización, DevOps e integración de inteligencia artificial en aplicaciones web.

* GitHub: [Jakoman222](https://github.com/Jakoman222)
* LinkedIn: [Jaime Condori Machaca](https://www.linkedin.com/in/jaime-condori-machaca-083052214)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y como parte de un portafolio profesional.
