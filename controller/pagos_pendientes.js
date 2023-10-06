const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres,roles}  = require("../database/models");
let pagosPendientesController = {
    lista:async (req, res) => {
        try {
            let pagos_pendientes = await pagos_pendientes.findAll({include:[{model:usuarios,as:"usuario"}]})
            res.render("./pagos_pendientes",{title:"Pagos Pendientes",pagos_pendientes});
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = pagosPendientesController;