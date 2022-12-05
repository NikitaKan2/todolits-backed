import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('todolist', 'oem', 'user', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  logging: false,
});

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.STRING,
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
  timestamps: true,
});

export default Task;
