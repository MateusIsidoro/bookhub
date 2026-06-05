import * as userService from './user.service.js';
import User from './user.model.js';

/**
 * Controller para processar o cadastro de usuário
 */
export const register = async (req, res) => {
    try {
        const result = await userService.register(req.body, User);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
