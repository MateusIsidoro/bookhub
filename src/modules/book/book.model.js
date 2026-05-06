
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  coverUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  fileUrl: {
    type: DataTypes.STRING(255),
    allowNull: false // Regra de Negócio: arquivo é obrigatório
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'Books'
});

module.exports = Book;