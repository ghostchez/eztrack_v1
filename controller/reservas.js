const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let reservasController = {
    create: (req, res) => {
        res.render("./reservas",{tab:"gestion",title:"reservas"});
    }
}

module.exports = reservasController;