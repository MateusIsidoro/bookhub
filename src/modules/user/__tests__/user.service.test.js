import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as userService from '../user.service.js';

describe('User Service - Testes Unitários', () => {
    let mockUserModel;

    beforeEach(() => {
        // Mock das funções do Sequelize UserModel
        mockUserModel = {
            findOne: vi.fn(),
            create: vi.fn(),
            findByPk: vi.fn(),
            update: vi.fn()
        };
    });

    // --- TESTES DE CADASTRO (REGISTER) ---

    it('1. deve cadastrar um usuário com sucesso quando todos os dados são válidos', async () => {
        const validData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123',
            fullName: 'Leitor Teste'
        };

        // Simula que o usuário não existe no banco
        mockUserModel.findOne.mockResolvedValue(null);
        // Simula a criação com sucesso
        mockUserModel.create.mockResolvedValue({
            id: 1,
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            fullName: 'Leitor Teste'
        });

        const result = await userService.register(validData, mockUserModel);

        expect(result.message).toBe('Usuário cadastrado com sucesso!');
        expect(result.user).toHaveProperty('id', 1);
        expect(result.user.username).toBe('leitor123');
        expect(mockUserModel.create).toHaveBeenCalledTimes(1);
    });

    it('2. deve retornar erro se o e-mail não for fornecido', async () => {
        const invalidData = {
            username: 'leitor123',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('O e-mail é obrigatório.');
    });

    it('3. deve retornar erro se o e-mail tiver formato inválido', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'emailinvalido',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('Formato de e-mail inválido.');
    });

    it('4. deve retornar erro se o nome de usuário não for fornecido', async () => {
        const invalidData = {
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('O nome de usuário é obrigatório.');
    });

    it('5. deve retornar erro se o nome de usuário for muito curto', async () => {
        const invalidData = {
            username: 'le',
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('O nome de usuário deve ter no mínimo 3 caracteres.');
    });

    it('6. deve retornar erro se o nome de usuário for muito longo', async () => {
        const invalidData = {
            username: 'a'.repeat(51),
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('O nome de usuário deve ter no máximo 50 caracteres.');
    });

    it('7. deve retornar erro se a senha não for fornecida', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            confirmPassword: 'Password123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('A senha é obrigatória.');
    });

    it('8. deve retornar erro se a senha tiver menos de 8 caracteres (RN02)', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            password: 'Pass1',
            confirmPassword: 'Pass1'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('A senha deve ter no mínimo 8 caracteres.');
    });

    it('9. deve retornar erro se a senha não contiver letras (RN02)', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            password: '12345678',
            confirmPassword: '12345678'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('A senha deve conter pelo menos uma letra e um número.');
    });

    it('10. deve retornar erro se a senha não contiver números (RN02)', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            password: 'PasswordOnly',
            confirmPassword: 'PasswordOnly'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('A senha deve conter pelo menos uma letra e um número.');
    });

    it('11. deve retornar erro se a senha e a confirmação não coincidirem', async () => {
        const invalidData = {
            username: 'leitor123',
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Different123'
        };

        await expect(userService.register(invalidData, mockUserModel))
            .rejects
            .toThrow('As senhas não coincidem.');
    });

    it('12. deve retornar erro se o e-mail já estiver cadastrado (RN01)', async () => {
        const duplicateEmailData = {
            username: 'leitor123',
            email: 'existente@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        // Simula que o email já existe
        mockUserModel.findOne.mockResolvedValueOnce({ id: 2, email: 'existente@bookhub.com' });

        await expect(userService.register(duplicateEmailData, mockUserModel))
            .rejects
            .toThrow('Este e-mail já está cadastrado.');
    });

    it('13. deve retornar erro se o nome de usuário já estiver cadastrado', async () => {
        const duplicateUsernameData = {
            username: 'existente',
            email: 'leitor@bookhub.com',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        // Primeira chamada (busca por email) retorna null, segunda chamada (busca por username) retorna registro existente
        mockUserModel.findOne
            .mockResolvedValueOnce(null) // email livre
            .mockResolvedValueOnce({ id: 3, username: 'existente' }); // username ocupado

        await expect(userService.register(duplicateUsernameData, mockUserModel))
            .rejects
            .toThrow('Este nome de usuário já está cadastrado.');
    });

    // --- TESTES DE ATUALIZAÇÃO DE PERFIL (UPDATE PROFILE) ---

    it('14. deve atualizar o perfil do usuário com sucesso', async () => {
        const updateData = {
            fullName: 'Leitor Atualizado',
            profilePic: 'new-profile.png'
        };

        mockUserModel.findByPk.mockResolvedValue({ id: 1, username: 'leitor123' });
        mockUserModel.update.mockResolvedValue([1]); // Sequelize retorna array com linhas afetadas

        const result = await userService.updateProfile(1, updateData, mockUserModel);

        expect(result.message).toBe('Perfil atualizado com sucesso!');
        expect(result.userId).toBe(1);
        expect(mockUserModel.update).toHaveBeenCalledWith(updateData, { where: { id: 1 } });
    });

    it('15. deve retornar erro ao tentar atualizar perfil de um usuário inexistente', async () => {
        const updateData = {
            fullName: 'Inexistente'
        };

        mockUserModel.findByPk.mockResolvedValue(null); // Usuário não existe

        await expect(userService.updateProfile(999, updateData, mockUserModel))
            .rejects
            .toThrow('Usuário não encontrado.');
    });
});
