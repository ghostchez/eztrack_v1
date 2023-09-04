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
      reservas.belongsTo(models.opcion_alquileres,{foreignKey:"idOpcionAlquiler"});
      reservas.belongsTo(models.vehiculos,{foreignKey:"idVehiculo"});
      reservas.belongsTo(models.eventos,{foreignKey:"idEvento"});
      reservas.belongsTo(models.usuarios,{foreignKey:"idUsuario"});
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