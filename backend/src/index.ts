// import consumers = require("node:stream/consumers")

// Se carga variables del archivo .env
require("dotenv").config()

//import express from "express"
const express = require("express")

// Importamos CORS
// Esto permite que el forntend (React) pueda comunicarse con el backend
const cors = require("cors") //

// Importamos JWT
const jwt = require('jsonwebtoken')

// Agregamos nuestra clave // JWT
const SECRET_KEY = process.env.JWT_SECRET || 'MBLACKss501!'
// Evita dejar la clave en el codigo

// 6) Importamos Prisma Client y el adaptador para PostgreSQL
// Prisma es la herramienta que conecta nuestro backend con la base de datos
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")

// 7) Se crea el adaptador usando la URL de conexion
// Es la conexion real a postgresql

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

// Creamos la instancia de Prisma
const prisma = new PrismaClient({ adapter })



const app = express()
const PORT = 3000

// ANTES: El frontend no podia conectarse (error de CORS)
// AHORA: Permitimos cualquier origen (ideal para desarrollo clase)
app.use(cors())

// Middleware para leer JSON del body
app.use(express.json());


//

// JWT
// Creacion de middleware //
// Funcion verifyToken
function verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token){
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    jwt.verify(token, SECRET_KEY, (error: any, user: any) => {
        if (error) {
            return res.status(403).json({ message: 'Token inválido' })
        }
        req.user = user
        // Llama a next
        next()
    })
}

// Nueva ruta POST, para JWT
app.post('/login', async (req:any, res:any) => {
    // obtener username y password
    const { username, password } = req.body

    // validar credenciales
    if (!username || !password){
        return res.status(400).json({ message: 'Faltan username o password' })
    }

    const user = await prisma.user.findUnique({
    where: { username },
    })

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Usuario o contraseña inválidos' })
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
    )

    res.json({ token })
})

// JWT
// Agregar nueva ruta
// Creando ruta PROTEGIDA
app.get('/private', verifyToken, (req: any, res: any) => {
    console.log('Acceso permitido')
    res.json({ message: 'Acceso permitido', user: req.user })
})

/* 3) CAMBIO IMPORTANTE: */
/**
 * ANTES: se usaba 'title'
 * AHORA: Se permite cualquier origen (ideal para el desarrollo/clase)
 */
// let tasks = [
//     {id: 1, text: "Study Express", completed: false},
//     {id: 2, text: "Build backend", completed: true}
// ]

// GET ruta de prueba
app.get("/", (req: any, res: any) => {
    res.send('Backend is working!')
})

// GET
app.get("/tasks", async (req: any, res:any) => {
    try {
        const tasks = await prisma.task.findMany()
        res.json(tasks)

    }catch(error){
        console.error('Error en GET /tasks:', error)
        res.status(500).json({ message: 'Error al obtener tareas'})
    }
})

/**
 * POST /tasks
 * ANTES: recibia 'title'
 * AHORA: recibe 'text' (igual que el frontend)
 */

app.post("/tasks", async (req: any, res: any) => {
    try {
        const newTask = await prisma.task.create({
            data: {
                text: req.body.text,
                completed: false,
            },
        })

        res.json(newTask)

    } catch (error) {
        console.error('Error en POST /tasks:', error)
        res.status(500).json({ message: "Error al crear tarea"})
    }
})



// 11) ADD PUT /tasks/:id & ADD DELETE
// Actualiza el estado 'completed' de una tarea especifica

app.put("/tasks/:id", async (req: any, res: any) => {
    try {
        const taskID = Number(req.params.id)

        const updatedTask = await prisma.task.update({
            where: { id: taskID},
            data: {
                completed: req.body.completed,
            },
        })

        res.json(updatedTask)

    } catch (error) {
        console.error("Error en PUT /tasks/:id", error)
        res.status(500).json({ message: "Error al actualizar tarea"})
    }
})

// ---------------------------------------------------
// DELETE
app.delete('/tasks/:id', async (req:any, res:any) => {
    
    try {
        const taskID = Number(req?.params?.id)

        // Validacion
        if (Number.isNaN(taskID)){
            return res.status(400).json({ message: 'Invalid ID' })
        }

        console.log("DELETE id:", req.params.id, taskID)
        await prisma.task.delete({
            where: { id: taskID},
        })
        // Respuesta exitosa
        res.status(204).send() // Backend no responde nada al no existir un res.send() ni res.json()
    } catch (error: any) {

        if(error.code === 'P2025'){
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }

        console.error("Error en DELETE /tasks/:id", error)
        res.status(500).json({ message: "Error al eliminar tarea"})
        
    }

    
})

// ---------------------------------------------------

// JWT

// ---------------------------------------------------

//

 
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


