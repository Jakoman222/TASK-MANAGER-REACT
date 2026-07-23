import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../app.ts';

describe('Backend API', () => {
    it('GET / debe responder que el backend funciona', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Backend is working!');
    });

    it('POST /login debe devolver token con credenciales correctas', async () => {
        const response = await request(app).post('/login').send({
            username: 'postgresql',
            password: 'password',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    it('POST /login debe rechazar credenciales incorrectas', async () => {
        const response = await request(app).post('/login').send({
            username: 'wrong',
            password: 'wrong',
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'Ususario o contraseña incorrectos',
        });
    });

    it('GET /private debe rechazar si no se envía token', async () => {
        const response = await request(app).get('/private');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'Token no proporcionado',
        });
    });

    it('GET /private debe permitir acceso con token válido', async () => {
        const loginResponse = await request(app).post('/login').send({
            username: 'postgresql',
            password: 'password',
        });

        const token = loginResponse.body.token;

        const response = await request(app)
            .get('/private')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Acceso permitido',
        });
    });

    it('GET /tasks debe devolver un array de tareas', async () => {
        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /tasks crear una nueva tarea', async () => {
        const newTask = {
            text: 'Nueva tarea de prueba',
            completed: false,
        };

        const response = await request(app).post('/tasks').send(newTask);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.text).toBe(newTask.text);
        expect(response.body.completed).toBe(newTask.completed);
    });

    // BUG 3 (Acepta tareas vacías)
    it('POST /tasks no debe permitir crear una tarea vacía', async () => {
        const newTask = {
            text: '',
            completed: false,
        };

        const response = await request(app).post('/tasks').send(newTask);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'El texto de la tarea no puede estar vacío',
        });
    });
});
