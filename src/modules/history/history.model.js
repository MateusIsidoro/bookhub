
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const ReadingHistory = sequelize.define('ReadingHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  progress: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    validate: { min: 0, max: 100 }
  },
  lastReadAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' }
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: 'Books', key: 'id' }
  }
}, {
  timestamps: true,
  tableName: 'ReadingHistories'
});

export default ReadingHistory;