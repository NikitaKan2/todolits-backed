import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Task from './Task.js';

class User extends Model {}

User.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'users',
  timestamps: false,
});

Task.belongsTo(User);
User.hasMany(Task, {
  foreignKey: 'userId',
});

export default User;
