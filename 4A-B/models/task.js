'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Collection, {foreignKey: 'collection_id'})
    }
  }
  Task.init({
    name: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN,
    collection_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks_tb',
    timestamps: false,
  });
  return Task;
};