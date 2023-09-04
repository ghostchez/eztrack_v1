'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  usuarios.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    identidadVerificada: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'usuarios',
    paranoid:false,
    timestamps:false
  });
  return usuarios;
};