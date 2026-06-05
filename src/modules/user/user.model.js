import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  booksReadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  favoritesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: 'Users'
});

export default User;