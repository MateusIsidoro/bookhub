import { describe, it, expect } from 'vitest';
import Category from '../category.model.js';

describe('Category Model - Testes Unitários', () => {
    it('deve ter as propriedades corretas definidas no modelo', () => {
        expect(Category.rawAttributes).toHaveProperty('name');
    });

    it('deve validar que o nome da categoria é obrigatório e único', () => {
        expect(Category.rawAttributes.name.allowNull).toBe(false);
        expect(Category.rawAttributes.name.unique).toBe(true);
    });
});
