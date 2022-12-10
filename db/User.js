import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class User extends Model {
  static associate({ Task }) {
    this.hasMany(Task, { foreignKey: 'userId' });
  }
}

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
  underscored: true,
  modelName: 'users',
  timestamps: true,
});

export default User;
