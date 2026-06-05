import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import * as userService from '../user.service.js';

// Mock do módulo de serviço para isolar o controller
vi.mock('../user.service.js');

describe('User Controller - Testes de Integração (Supertest)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('1. GET / deve retornar status 200 e mensagem de boas-vindas', async () => {
        const response = await request(app).get('/');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Welcome to BookHub API');
    });

    it('2. GET /nonexistent deve retornar status 404 e mensagem de erro', async () => {
        const response = await request(app).get('/nonexistent');
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Not Found');
    });

    it('3. POST /register com dados válidos deve retornar status 201 e JSON do usuário', async () => {
        // Simula cadastro com sucesso no serviço
        userService.register.mockResolvedValueOnce({
            message: 'Usuário cadastrado com sucesso!',
            user: { id: 1, username: 'testuser', email: 'test@test.com' }
        });

        const response = await request(app)
            .post('/register')
            .send({
                fullName: 'Test User',
                username: 'testuser',
                email: 'test@test.com',
                password: 'Password123',
                confirmPassword: 'Password123'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
        expect(response.body.user).toHaveProperty('id', 1);
        expect(response.body.user.username).toBe('testuser');
    });

    it('4. POST /register com senhas divergentes deve retornar status 400 e JSON de erro', async () => {
        // Simula erro de validação de senhas no serviço
        userService.register.mockRejectedValueOnce(new Error('As senhas não coincidem.'));

        const response = await request(app)
            .post('/register')
            .send({
                fullName: 'Test User',
                username: 'testuser',
                email: 'test@test.com',
                password: 'Password123',
                confirmPassword: 'WrongPassword'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'As senhas não coincidem.');
    });

    it('5. POST /register com e-mail já cadastrado deve retornar status 400 e JSON de erro', async () => {
        // Simula erro de e-mail duplicado no serviço
        userService.register.mockRejectedValueOnce(new Error('Este e-mail já está cadastrado.'));

        const response = await request(app)
            .post('/register')
            .send({
                fullName: 'Test User',
                username: 'testuser',
                email: 'existente@test.com',
                password: 'Password123',
                confirmPassword: 'Password123'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Este e-mail já está cadastrado.');
    });
});
