'use strict';
const { Model } = require('sequelize');
const ca = require('./ca');
module.exports = (sequelize, DataTypes) => {
  class provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */
    static associate(models) {
      provincia.hasMany(models.localidad, {
        foreignKey: 'id'
      });
      provincia.belongsTo(models.ca, {
        foreignKey: 'id'
      });
    }
  };
  provincia.init({
    cp: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    poblacion: DataTypes.STRING,
    superficie: DataTypes.INTEGER,
    caId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'provincia',
  });
  return provincia;
};