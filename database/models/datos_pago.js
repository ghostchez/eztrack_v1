

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class datos_pagos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      datos_pagos.hasOne(models.usuarios,{foreignKey:"idDatosPago"})

    }
  }
  datos_pagos.init({
    direccion: DataTypes.STRING,
    estado: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    email: DataTypes.STRING,
    titular: DataTypes.STRING,
    numero_tarjeta: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    vencimiento: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'datos_pagos',
    paranoid:true,
    timestamps:true
  });
  return datos_pagos;
};