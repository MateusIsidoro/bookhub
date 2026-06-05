import { describe, it, expect } from 'vitest';
import ReadingHistory from '../history.model.js';

describe('ReadingHistory Model - Testes Unitários', () => {
    it('deve ter as propriedades corretas definidas no modelo', () => {
        expect(ReadingHistory.rawAttributes).toHaveProperty('progress');
        expect(ReadingHistory.rawAttributes).toHaveProperty('lastReadAt');
        expect(ReadingHistory.rawAttributes).toHaveProperty('userId');
        expect(ReadingHistory.rawAttributes).toHaveProperty('bookId');
    });

    it('deve ter valores padrão corretos', () => {
        expect(ReadingHistory.rawAttributes.progress.defaultValue).toBe(0.00);
    });
});
