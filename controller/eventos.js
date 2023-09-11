const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let reservasController = {
    create: (req, res) => {
        res.render("./eventos",{sess:req.session,tab:"gestion",title:"eventos"});
    }
}

module.exports = reservasController;