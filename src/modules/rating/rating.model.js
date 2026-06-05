
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('approved', 'pending', 'blocked'),
    defaultValue: 'approved'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Books', key: 'id' }
  }
}, {
  timestamps: true,
  tableName: 'Ratings',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'bookId'] // Garante que o usuário avalie apenas uma vez (RN09)
    }
  ]
});

export default Rating;