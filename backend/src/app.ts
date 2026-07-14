import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const SECRET_KEY = process.env.JWT_SECRET || 'MBLACKss501!';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors());
app.use(express.json());

// JWT middleware
function verifyToken(req: any, res: any, next: any) {
	console.log('Middleware verifyToken llamado');

	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Token no proporcionado' });
	}

	jwt.verify(token, SECRET_KEY, (error: any, user: any) => {
		if (error) {
			return res.status(403).json({ message: 'Token inválido' });
		}

		req.user = user;
		next();
	});
}

// Login
app.post('/login', (req: any, res: any) => {
	const { username, password } = req.body;

	if (username !== 'postgresql' || password !== 'password') {
		return res
			.status(401)
			.json({ message: 'Ususario o contraseña incorrectos' });
	}

	const payload = { username };

	const token = jwt.sign(payload, SECRET_KEY, {
		expiresIn: '1h',
	});

	res.json({ token });
});

// Ruta protegida
app.get('/private', verifyToken, (req: any, res: any) => {
	res.json({ message: 'Acceso permitido' });
});

// Ruta de prueba
app.get('/', (req: any, res: any) => {
	res.send('Backend is working!');
});

// GET tasks
app.get('/tasks', async (req: any, res: any) => {
	try {
		await prisma.$connect();

		const tasks = await prisma.task.findMany();

		res.json(tasks);
	} catch (error: any) {
		console.error('❌ Error en GET /tasks:', error);

		res.status(500).json({
			message: error.message,
			code: error.code,
		});
	}
});

// POST task
app.post('/tasks', async (req: any, res: any) => {
	try {
		const { text } = req.body;

		if (typeof text !== 'string') {
			return res.status(400).json({ message: 'El texto de la tarea es inválido' });
		}

		const cleanText = text.trim();

		if(!cleanText){
			return res
				.status(400)
				.json({ message: 'El texto de la tarea no puede estar vacío' });
		}

		const newTask = await prisma.task.create({
			data: {
				text: cleanText,
				completed: false,
			},
		});

		res.json(newTask);
	} catch (error) {
		console.error('Error en POST /tasks:', error);
		res.status(500).json({ message: 'Error al crear tarea' });
	}
});

// PUT task
app.put('/tasks/:id', async (req: any, res: any) => {
	try {
		const taskID = Number(req.params.id);

		const updatedTask = await prisma.task.update({
			where: { id: taskID },
			data: {
				completed: req.body.completed,
			},
		});

		res.json(updatedTask);
	} catch (error) {
		console.error('Error en PUT /tasks/:id', error);
		res.status(500).json({ message: 'Error al actualizar tarea' });
	}
});

// DELETE task
app.delete('/tasks/:id', async (req: any, res: any) => {
	try {
		const taskID = Number(req?.params?.id);

		if (Number.isNaN(taskID)) {
			return res.status(400).json({ message: 'Invalid ID' });
		}

		await prisma.task.delete({
			where: { id: taskID },
		});

		res.status(204).send();
	} catch (error: any) {
		if (error.code === 'P2025') {
			return res.status(404).json({ message: 'Tarea no encontrada' });
		}

		console.error('Error en DELETE /tasks/:id', error);
		res.status(500).json({ message: 'Error al eliminar tarea' });
	}
});

export { app, prisma };
