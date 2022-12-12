import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class Task extends Model {
  static associate({ User }) {
    this.belongsTo(User);
  }
}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      checkBoolean(value) {
        if (typeof value !== 'boolean') {
          throw new Error('Filed "done" must be "boolean" type');
        }
      },
    },
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'task',
  timestamps: true,
});

export default Task;
