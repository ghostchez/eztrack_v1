'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehiculos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  vehiculos.init({
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    año: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    potencia: DataTypes.INTEGER,
    traccion: DataTypes.INTEGER,
    precio_vuelta: DataTypes.INTEGER,
    nivel: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    disponibilidad: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'vehiculos',
    paranoid:false,
    timestamps:true
  });
  return vehiculos;
};