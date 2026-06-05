import { describe, it, expect } from 'vitest';
import Book from '../book.model.js';

describe('Book Model - Testes Unitários', () => {
    it('deve ter as propriedades corretas definidas no modelo', () => {
        expect(Book.rawAttributes).toHaveProperty('title');
        expect(Book.rawAttributes).toHaveProperty('author');
        expect(Book.rawAttributes).toHaveProperty('synopsis');
        expect(Book.rawAttributes).toHaveProperty('coverUrl');
        expect(Book.rawAttributes).toHaveProperty('fileUrl');
        expect(Book.rawAttributes).toHaveProperty('categoryId');
    });

    it('deve validar que título e autor são obrigatórios', () => {
        expect(Book.rawAttributes.title.allowNull).toBe(false);
        expect(Book.rawAttributes.author.allowNull).toBe(false);
    });

    it('deve validar que o arquivo de leitura é obrigatório', () => {
        expect(Book.rawAttributes.fileUrl.allowNull).toBe(false);
    });
});
