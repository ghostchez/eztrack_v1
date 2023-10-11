const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let reservasController = {
    create: async(req, res) => {
        let reservas_list = await reservas.findAll({include:[{model:usuarios,as:"usuario"},{model:opcion_alquileres,as:"opcion"},{model:eventos,as:"evento"},{model:vehiculos,as:"vehiculo"}]})
        res.render("./reservas",{sess:req.session,tab:"gestion",title:"reservas",reservas_list});
    },
    mis_ordenes:(req,res)=>{
        res.render("./mis_ordenes",{sess:req.session,tab:"usuarios",title:"mis ordenes"});
    },
}

module.exports = reservasController;