import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from './index.js';

class User extends Model {}

User.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 6));
    },
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'users',
  timestamps: true,
});

export default User;
