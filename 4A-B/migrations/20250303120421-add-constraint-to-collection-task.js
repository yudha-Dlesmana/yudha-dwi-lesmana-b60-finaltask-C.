'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('collections_tb', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_users',
      references: {
        table: 'users_tb',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    })
    await queryInterface.addConstraint('tasks_tb', {
      fields: ['collection_id'],
      type: 'foreign key',
      name: 'fk_collections',
      references: {
        table: 'collections_tb',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('collections_tb', 'fk_users');
    await queryInterface.removeConstraint('tasks_tb', 'fk_collections')
  }
};
