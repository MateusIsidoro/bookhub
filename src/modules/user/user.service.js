/**
 * Serviço de Usuário - Regras de Negócio para Cadastro e Perfil
 */

// Regex simples para validação de formato de e-mail
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para validar se contém pelo menos uma letra e um número
const PASSWORD_LETTER_REGEX = /[A-Za-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;

/**
 * Cadastra um novo usuário seguindo as regras de negócio RN01 e RN02
 * @param {Object} data - Dados do formulário de cadastro
 * @param {Object} UserModel - Modelo do Sequelize para Usuário (ou mock correspondente)
 * @returns {Promise<Object>} Resultado da criação do usuário
 */
export const register = async (data, UserModel) => {
    const { username, email, password, confirmPassword, fullName = null } = data;

    // Validações de e-mail
    if (!email) {
        throw new Error('O e-mail é obrigatório.');
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new Error('Formato de e-mail inválido.');
    }

    // Validações de nome de usuário (username)
    if (!username) {
        throw new Error('O nome de usuário é obrigatório.');
    }
    if (username.length < 3) {
        throw new Error('O nome de usuário deve ter no mínimo 3 caracteres.');
    }
    if (username.length > 50) {
        throw new Error('O nome de usuário deve ter no máximo 50 caracteres.');
    }

    // Validações de senha (RN02)
    if (!password) {
        throw new Error('A senha é obrigatória.');
    }
    if (password.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }
    if (!PASSWORD_LETTER_REGEX.test(password) || !PASSWORD_NUMBER_REGEX.test(password)) {
        throw new Error('A senha deve conter pelo menos uma letra e um número.');
    }

    // Validação de confirmação de senha
    if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
    }

    // Validação de e-mail único (RN01)
    const existingEmail = await UserModel.findOne({ where: { email } });
    if (existingEmail) {
        throw new Error('Este e-mail já está cadastrado.');
    }

    // Validação de username único
    const existingUsername = await UserModel.findOne({ where: { username } });
    if (existingUsername) {
        throw new Error('Este nome de usuário já está cadastrado.');
    }

    // Criação do usuário (Simulado pelo ORM)
    const newUser = await UserModel.create({
        username,
        email,
        password, // Em produção seria feito o hash, mas mantemos fluxo de teste simples
        fullName
    });

    return {
        message: 'Usuário cadastrado com sucesso!',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            fullName: newUser.fullName
        }
    };
};

/**
 * Atualiza o perfil de um usuário
 * @param {number|string} userId - ID do usuário a ser atualizado
 * @param {Object} updateData - Dados a serem atualizados
 * @param {Object} UserModel - Modelo do Sequelize para Usuário
 * @returns {Promise<Object>} Resultado da atualização
 */
export const updateProfile = async (userId, updateData, UserModel) => {
    if (!userId) {
        throw new Error('ID do usuário é obrigatório.');
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    await UserModel.update(updateData, { where: { id: userId } });

    return {
        message: 'Perfil atualizado com sucesso!',
        userId
    };
};
