import { describe, it, expect } from 'vitest';
import Rating from '../rating.model.js';

describe('Rating Model - Testes Unitários', () => {
    it('deve ter as propriedades corretas definidas no modelo', () => {
        expect(Rating.rawAttributes).toHaveProperty('rating');
        expect(Rating.rawAttributes).toHaveProperty('comment');
        expect(Rating.rawAttributes).toHaveProperty('status');
        expect(Rating.rawAttributes).toHaveProperty('userId');
        expect(Rating.rawAttributes).toHaveProperty('bookId');
    });

    it('deve validar que a nota da avaliação (rating) é obrigatória', () => {
        expect(Rating.rawAttributes.rating.allowNull).toBe(false);
    });

    it('deve ter valor padrão para o status como approved', () => {
        expect(Rating.rawAttributes.status.defaultValue).toBe('approved');
    });
});
