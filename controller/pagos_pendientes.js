const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres,roles,pagos_pendientes}  = require("../database/models");
let pagosPendientesController = {
    lista:async (req, res) => {
        try {
            let pagos_pendientes_list = await pagos_pendientes.findAll({where:{status:"pendiente"},include:[{model:usuarios,as:"usuario"},{model:reservas,as:"reserva"}]})
            let pagos_confirmados_list = await pagos_pendientes.findAll({where:{status:"confirmado"},include:[{model:usuarios,as:"usuario"},{model:reservas,as:"reserva"}]})

            res.render("./pagos",{sess:req.session,tab:"gestion",title:"Pagos",pagos_pendientes_list,pagos_confirmados_list});
        } catch (error) {
            console.log(error);
        }
    },
    detalle:async (req, res) => {
        try {
            let {id} = req.params;
            let pagos_pendientes_detalle = await pagos_pendientes.findOne({where:{id},include:[{model:usuarios,as:"usuario"},{model:reservas,as:"reserva"}]})

            res.render("./pago_detalle",{sess:req.session,tab:"gestion",title:"Pagos",pagos_pendientes_detalle});
        } catch (error) {
            console.log(error);
        }
    },
    mis_pagos_pendientes:async (req, res) => {
        try {
            let sess = req.session;
            let status = req.query.status ?? null;
            let pagos_pendientes_list = await pagos_pendientes.findAll({where:{idUsuario:sess.idUser,archivo:null,status:"pendiente"},include:[{model:usuarios,as:"usuario"},{model:reservas,as:"reserva"}]})
            let pagos_pendientes_enviado_list = await pagos_pendientes.findAll({where:{idUsuario:sess.idUser,archivo:{[Op.ne]: null},status:"pendiente"},include:[{model:usuarios,as:"usuario"},{model:reservas,as:"reserva"}]})

            res.render("./mis_pagos_pendientes",{sess:req.session,tab:"usuarios",title:"mis pagos pendientes",pagos_pendientes_list,pagos_pendientes_enviado_list ,status});
        } catch (error) {
            console.log(error);
        }
    },
    enviar_comprobante:async (req, res) => {
        try {
            let pagos_pendientes_enviado = await pagos_pendientes.update({archivo:req.file.filename},{where:{id:req.body.idPagosPendientes}});
            if(pagos_pendientes_enviado){
                res.redirect("/usuarios/mis_pagos_pendientes?status=success");
            }else{
                res.redirect("/usuarios/mis_pagos_pendientes?status=error");

            }
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = pagosPendientesController;