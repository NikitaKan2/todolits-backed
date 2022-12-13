/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    }, {
      timestamps: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tasks');
  },
};
