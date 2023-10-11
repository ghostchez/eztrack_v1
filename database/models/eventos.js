'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      eventos.hasOne(models.reservas,{foreignKey:"idEvento"})
    }
  }
  eventos.init({
    nombre: DataTypes.STRING,
    fecha_hasta: DataTypes.STRING,
    fecha_desde: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    nombre_evento: DataTypes.STRING,
    nombre_autodromo: DataTypes.STRING,
    url_ubicacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'eventos',
    paranoid:true,
    timestamps:true
  });
  return eventos;
};