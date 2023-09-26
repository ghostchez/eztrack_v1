'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservas.belongsTo(models.opcion_alquileres,{foreignKey:"idOpcionAlquiler",as:"opcion"});
      reservas.belongsTo(models.vehiculos,{foreignKey:"idVehiculo",as:"vehiculo"});
      reservas.belongsTo(models.eventos,{foreignKey:"idEvento",as:"evento"});
      reservas.belongsTo(models.usuarios,{foreignKey:"idUsuario",as:"usuario"});
    }
  }
  reservas.init({
    idUsuario: DataTypes.INTEGER,
    idVehiculo: DataTypes.INTEGER,
    idEvento: DataTypes.INTEGER,
    idOpcionAlquiler: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    idPago: DataTypes.INTEGER,
    fecha: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'reservas',
    paranoid:false,
    timestamps:true
  });
  return reservas;
};