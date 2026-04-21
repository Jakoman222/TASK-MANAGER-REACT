// Se carga variables del archivo .env
import dotenv from "dotenv"
dotenv.config() // Carga las variables de entorno desde el archivo .env
import express from "express"
import { Request, Response, NextFunction } from "express"

// Importamos CORS
// Esto permite que el forntend (React) pueda comunicarse con el backend
import cors from "cors" //

// Importamos JWT
import jwt from 'jsonwebtoken'

// Agregamos nuestra clave // JWT
const SECRET_KEY = process.env.JWT_SECRET || 'MBLACKss501!'
// const SECRET_KEY = process.env.JWT_SECRET || 'MBLACKss501!'
console.log('SECRET_KEY used:', SECRET_KEY)
// Evita dejar la clave en el codigo

// 6) Importamos Prisma Client y el adaptador para PostgreSQL
// Prisma es la herramienta que conecta nuestro backend con la base de datos
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// 7) Se crea el adaptador usando la URL de conexion
// Es la conexion real a postgresql

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

// Creamos la instancia de Prisma
const prisma = new PrismaClient({ adapter })



const app = express()
const PORT = process.env.PORT || 3000

// ANTES: El frontend no podia conectarse (error de CORS)
// AHORA: Permitimos cualquier origen (ideal para desarrollo clase)
app.use(cors({
    origin: 'https://task-manager-react-x4gb.onrender.com/' // Permite cualquier origen (no recomendado para producción)
}))

// Middleware para leer JSON del body
app.use(express.json());


//

// JWT
// Creacion de middleware //
// Funcion verifyToken
function verifyToken(req: any, res: any, next: any) {
    console.log('Middleware verifyToken llamado')
    const authHeader = req.headers.authorization
    
    console.log('authHeader:', authHeader)
    console.log('Headers:', req.headers)
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token:', token)

    if (!token){
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    jwt.verify(token, SECRET_KEY, (error: any, user: any) => {
        console.log('verify error:', error)
        console.log('verify user:', user)
        if (error) {
            return res.status(403).json({ message: 'Token inválido' })
        }
        req.user = user
        // Llama a next
        next()
    })
}

// Nueva ruta POST, para JWT
app.post('/login', (req:any, res:any) => {
    console.log('Body recibido:', req.body) // Agrega esto para debug
    console.log('Headers:', req.headers) // Y esto
    // obtener username y password
    const { username, password } = req.body
    console.log(`Objeto username and password: ${JSON.stringify(req.body)}`)
    // validar credenciales
    if (username !== 'postgresql' || password !== 'password' ){
        return res.status(401).json({ message: 'Ususario o contraseña incorrectos' })
    }

    const payload = { username }
    // generar token con jwt.sign()
    const token = jwt.sign(
        payload, 
        SECRET_KEY, 
        { expiresIn: '1h' })
    // const token = jwt.sign(
    //     { username: username},
    //     SECRET_KEY,
    //     { expiresIn: '1h'}
    // )

    res.json({ token: token }) // para mandar los datos
    console.log('Token generado:', token) // Agrega esto para debug
})

// ---------------------------------------------------
// JWT
// Agregar nueva ruta
// Creando ruta PROTEGIDA
app.get('/private', verifyToken, (req: any, res: any) => {
    res.json({ message: 'Acceso permitido' })
})


/* 3) CAMBIO IMPORTANTE: */

// GET ruta de prueba
app.get("/", (req: any, res: any) => {
    res.send('Backend is working!')
})

// GET
app.get("/tasks", async (req: any, res:any) => {
    try {
        await prisma.$connect()
        console.log("✅ Conectado a DB") 
        
        const tasks = await prisma.task.findMany()

        console.log("📦 Tasks:", tasks)

        res.json(tasks)

    }catch(error: any){
        console.error('❌ Error en GET /tasks:', error)
        res.status(500).json({ 
            message: error.message,
            code: error.code
        })
    }
})


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



// CAPTURA DE ERRORES Y LOGS
// Manejadores de errores globales y logs
process.on('unhandledRejection', (reason, promise) => {
    console.error("❌ Promise rechazada no manejada:", reason)
})

process.on('uncaughtException', (error) => {
    console.error("❌ Excepción no capturada:", error)
    process.exit(1)
})

// Desconectar Prisma gracefully
process.on('SIGINT', async () => {
    console.log('\n📌 Recibida señal SIGINT, cerrando servidor...')
    await prisma.$disconnect()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('\n📌 Recibida señal SIGTERM, cerrando servidor...')
    await prisma.$disconnect()
    process.exit(0)
})

app.listen(PORT, ()=>{
    console.log(`✅ Server running on port ${PORT}`)
    console.log('📂 Escuchando cambios en src/ para reiniciar...')
})