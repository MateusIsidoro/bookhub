# Guia de Apresentação de Slides (Nota 7 - Avaliação N2)

Este documento contém o roteiro estruturado slide a slide para você criar sua apresentação em PowerPoint ou PDF. Cada seção representa um slide com os pontos chave e explicações recomendadas.

---

### Slide 1: Capa da Apresentação
*   **Título**: BookHub - Desenvolvimento Guiado por Testes (TDD)
*   **Subtítulo**: Avaliação Prática N2 - Testes de Software
*   **Conteúdo**:
    *   Estruturação de arquitetura moderna (ESM).
    *   Ciclos de TDD e cobertura de testes.
    *   Nome do Aluno / Curso / Turma.

---

### Slide 2: Visão Geral do Projeto
*   **Título**: O Projeto BookHub e a Funcionalidade Central
*   **Conteúdo**:
    *   **BookHub**: Plataforma digital para exploração de livros, registro de progresso de leitura, resenhas e favoritos.
    *   **Funcionalidade Foco**: Cadastro de Usuários (Registro) e Atualização de Perfil.
    *   **Regras de Negócio Implementadas**:
        *   **RN01 (Unicidade)**: E-mail e Username únicos no banco de dados.
        *   **RN02 (Complexidade)**: Senhas com no mínimo 8 caracteres, contendo obrigatoriamente letras e números.
        *   **Consistência**: Validação de formato de e-mail e tamanhos limites.

---

### Slide 3: O Ciclo TDD (Red-Green-Refactor)
*   **Título**: Desenvolvimento Orientado a Testes na Prática
*   **Conteúdo**:
    *   **RED (Vermelho)**: Escrevemos os testes descrevendo o comportamento esperado das validações antes de codificar a lógica de produção. Os testes falham (corretamente).
    *   **GREEN (Verde)**: Implementamos a menor quantidade de código possível na camada `user.service.js` para satisfazer as asserções e fazer os testes passarem.
    *   **REFACTOR (Refatorar)**: Limpamos o código, otimizamos regexes e organizamos as exceções, com a segurança de que os testes vigiam contra quebras indesejadas.

---

### Slide 4: O Papel dos Mocks no Isolamento
*   **Título**: Mocking de Dependências (Sequelize UserModel)
*   **Conteúdo**:
    *   **Por que usar Mocks?** Os testes unitários do Service não devem tocar o banco de dados real (lento, gera lixo de dados, requer conexão ativa).
    *   **Ferramenta**: `vi.fn()` e `vi.mock()` do Vitest.
    *   **Implementação**: Criamos um `mockUserModel` contendo representações falsas dos métodos `findOne`, `create`, `findByPk` e `update` do Sequelize.
    *   **Exemplo**:
        ```javascript
        mockUserModel.findOne.mockResolvedValueOnce({ id: 1, email: 'existente@test.com' });
        // O teste intercepta a chamada sem tocar no MySQL real
        ```

---

### Slide 5: Demonstração de Testes Unitários
*   **Título**: Testes de Validação da Camada Service
*   **Conteúdo**:
    *   Escrevemos **15 testes unitários** focados apenas em lógica pura.
    *   **Exemplo de código testado (Senhas não coincidem)**:
        ```javascript
        it('deve retornar erro se a senha e a confirmação não coincidirem', async () => {
            const data = { password: 'Password123', confirmPassword: 'Different123' };
            await expect(userService.register(data, mockUserModel))
                .rejects.toThrow('As senhas não coincidem.');
        });
        ```
    *   **Exemplo (Senha sem número)**: Valida a RN02 rejeitando senhas puramente textuais.

---

### Slide 6: Testes de Integração & Cobertura
*   **Título**: Validação HTTP (Supertest) e Relatório de Cobertura
*   **Conteúdo**:
    *   **Testes de Integração**: Implementação de **5 testes HTTP** utilizando Supertest para verificar o fluxo do Controller e Rotas (Status 200, redirecionamentos 302, flash messages).
    *   **Cobertura de Linhas**: Configuração e execução do `@vitest/coverage-v8` exibindo:
        *   `user.service.js`: **97.89%** de cobertura.
        *   `user.controller.js`: **100%** de cobertura.
        *   `user.routes.js`: **100%** de cobertura.
        *   Média global do módulo acima de 98% de cobertura!
