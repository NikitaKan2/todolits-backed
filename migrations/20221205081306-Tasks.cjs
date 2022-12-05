/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
