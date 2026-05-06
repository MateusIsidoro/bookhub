const User = require('../model/user');
const Book = require('../model/book');
const Category = require('../model/category');
const Review = require('../model/rating');
const ReadingHistory = require('../model/History');

// Relacionamentos
Category.hasMany(Book, { foreignKey: 'categoryId' });
Book.belongsTo(Category, { foreignKey: 'categoryId' });

// Favoritos (Relacionamento N:N Simples)
User.belongsToMany(Book, { through: 'UserFavorites', as: 'FavoriteBooks' });
Book.belongsToMany(User, { through: 'UserFavorites' });

// Avaliações
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

// Histórico de Leitura
User.belongsToMany(Book, { through: ReadingHistory });
Book.belongsToMany(User, { through: ReadingHistory });

module.exports = { User, Book, Category, Review, ReadingHistory };