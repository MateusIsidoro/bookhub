import { describe, it, expect } from 'vitest';
import Favorite from '../favorite.model.js';

describe('Favorite Model - Testes Unitários', () => {
    it('deve ter as propriedades corretas definidas no modelo', () => {
        expect(Favorite.rawAttributes).toHaveProperty('userId');
        expect(Favorite.rawAttributes).toHaveProperty('bookId');
    });

    it('deve validar que userId e bookId são obrigatórios', () => {
        expect(Favorite.rawAttributes.userId.allowNull).toBe(false);
        expect(Favorite.rawAttributes.bookId.allowNull).toBe(false);
    });
});
