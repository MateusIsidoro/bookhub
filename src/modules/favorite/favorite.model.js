import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'Favorites',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'bookId']
    }
  ]
});

export default Favorite;
