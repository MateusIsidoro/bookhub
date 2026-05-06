// modules/user/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { 
      isEmail: true 
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  profilePic: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // Diferenciação de permissões (Administrador vs Usuário Comum)
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Controle de bloqueio conforme requisito 2.2
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Campos para estatísticas no Painel Administrativo
  booksReadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  favoritesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true, // Registra data de cadastro e atualizações automaticamente
  tableName: 'Users'
});

module.exports = User;