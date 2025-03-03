'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.User, { foreignKey: 'user_id' })
      Collection.hasMany(models.Task, { foreignKey: 'collection_id', onDelete: 'CASCADE' })
    }
  }
  Collection.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collection',
    tableName: 'collections_tb',
    timestamps: false

  });
  return Collection;
};