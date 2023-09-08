const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let alquileresController = {
    alquiler:async (req,res) =>{
        let vehiculos_lista = await vehiculos.findAll();
        res.render("./alquiler",{tab:"servicios",title:"alquiler paso 1",vehiculos_lista});
    },
    alquiler2:async (req,res) =>{
        let {id} = req.params;
        let vehiculo = await vehiculos.findOne({where:{id}});
        let eventos_lista = await eventos.findAll();
    
        res.render("./alquiler2",{tab:"servicios",title:"alquiler paso 2",vehiculo,eventos_lista});
    },
    alquiler_paso2:async (req,res) =>{
        sess = req.session;
        const {vehiculo,evento,fecha} = req.body;
        let result = await reservas.create({
            idUsuario:sess.idUser,idVehiculo:vehiculo,idEvento:evento,fecha:fecha
        });
        res.redirect("/servicios/alquiler2/"+result.dataValues.id);
    },
    alquiler3:async (req,res) =>{
        let vehiculos_lista = await vehiculos.findAll();
        let {id} = req.params;
    
        res.render("./alquiler3",{tab:"servicios",title:"alquiler paso 3",vehiculos_lista,id});
    },
    alquiler_paso3:async (req,res) =>{
        const {cantidadVueltas,naftaIncluida,instructorABordo,analisisTelemetria,seguroPremium,compuestoNeumaticos,idReserva} = req.body;
        let resultado = await opcion_alquileres.create({
            cantidadVueltas,naftaIncluida,instructorABordo,analisisTelemetria,seguroPremium,compuestoNeumaticos
        });
        let result = await reservas.update({
            idOpcionAlquiler:resultado.dataValues.id
        },{where:{id:idReserva}});
    
        res.redirect("/servicios/alquiler3/"+idReserva);
    },
    alquiler4:async (req,res) =>{
        let vehiculos_lista = await vehiculos.findAll();
    
        res.render("./alquiler4",{tab:"servicios",title:"alquiler paso 4",vehiculos_lista});
    },
    
}
module.exports = alquileresController;

