'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pagos_pendientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        pagos_pendientes.belongsTo(models.usuarios,{foreignKey:"idUsuario",as:"usuario"});
        pagos_pendientes.belongsTo(models.reservas,{foreignKey:"idReserva",as:"reserva"});
    }
  }
  pagos_pendientes.init({
    total: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    metodo: DataTypes.STRING,
    archivo: DataTypes.STRING,
    idReserva: DataTypes.INTEGER,
    status: DataTypes.STRING,
    idDatosPago: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pagos_pendientes',
    paranoid:true,
    timestamps:true
  });
  return pagos_pendientes;
};