'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.province, {
        foreignKey: 'caId'
      });
    }
  };
  ca.init({
    nombre: DataTypes.STRING,
    poblacion: DataTypes.INTEGER,
    superficie: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ca',
  });
  return ca;
};