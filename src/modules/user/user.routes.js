import express from 'express';
import * as userController from './user.controller.js';

const router = express.Router();

// POST /register -> processa o cadastro
router.post('/register', userController.register);

export default router;
