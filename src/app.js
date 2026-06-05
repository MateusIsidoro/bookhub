import express from 'express';
import logger from 'morgan';
import userRoutes from './modules/user/user.routes.js';

const app = express();

// Middlewares globais
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas (vamos adicionar mais depois)
app.use('/', userRoutes);
app.get('/', (req, res) => res.json({ message: 'Welcome to BookHub API' }));

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

export default app;
