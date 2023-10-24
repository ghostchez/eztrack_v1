const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres,datos_pagos,pagos_pendientes}  = require("../database/models");
let alquileresController = {
    alquiler:async (req,res) =>{
        let status = req.query.status ?? null;
        let vehiculos_lista = await vehiculos.findAll();
        
        res.render("./alquiler",{sess:req.session,tab:"servicios",title:"alquiler paso 1",vehiculos_lista,status});
    },
    alquiler2:async (req,res) =>{
        let {id} = req.params;
        let vehiculo = await vehiculos.findOne({where:{id}});
        let eventos_lista = await eventos.findAll();
        let sess = req.session ?? null;
        sess.idAlquiler = vehiculo.id;
        sess.paso = 2;
        req.session.save(function(err) {
            console.log("saved");
        })
        res.render("./alquiler2",{sess:req.session,tab:"servicios",title:"alquiler paso 2",vehiculo,eventos_lista});
    },
    alquiler_paso2:async (req,res) =>{
        try {
            if(req.body.reset){
                let sess = req.session;
                delete sess["paso"]; 
                delete sess["idAlquiler"]; 
                req.session.save(function(err) {
                    console.log("borrado");
                })
                res.redirect("/servicios/alquiler/");
                throw("reset")
            }
            const {vehiculo,evento,fecha} = req.body;
            let sess = req.session ?? null;
            let result = await reservas.create({
                idUsuario:sess.idUser,idVehiculo:vehiculo,idEvento:evento,fecha:new Date(fecha).toISOString()
            });
            sess.paso = 3;
            req.session.save(function(err) {
                console.log("saved");
            })
            res.redirect("/servicios/alquiler3/"+result.dataValues.id);
        } catch (error) {
            console.log(error)
        }
        
    },
    alquiler3:async (req,res) =>{
        let vehiculos_lista = await vehiculos.findAll();
        let {id} = req.params;
    
        res.render("./alquiler3",{sess:req.session,tab:"servicios",title:"alquiler paso 3",vehiculos_lista,id});
    },
    alquiler_paso3:async (req,res) =>{
        const {cantidadVueltas,naftaIncluida,instructorABordo,analisisTelemetria,seguroPremium,compuestoNeumaticos,idReserva} = req.body;
        let resultado = await opcion_alquileres.create({
            cantidadVueltas,naftaIncluida,instructorABordo,analisisTelemetria,seguroPremium,compuestoNeumaticos
        });
        let result = await reservas.update({
            idOpcionAlquiler:resultado.dataValues.id
        },{where:{id:idReserva}});

        let sess = req.session ?? null;
        sess.paso = 4;
        req.session.save(function(err) {
            console.log("saved");
        })
        res.redirect("/servicios/alquiler4/"+idReserva);
    },
    alquiler4:async (req,res) =>{
        let status = req.query.status ?? null;
        let {id} = req.params;
        let resumen = await reservas.findOne({where:{id},include:[{model:usuarios,as:"usuario"},{model:opcion_alquileres,as:"opcion"},{model:eventos,as:"evento"},{model:vehiculos,as:"vehiculo"}]});
        let usuarioActual = await usuarios.findOne({where:{id:sess.idUser},include:[{model:datos_pagos,as:"datos_pago"}]});
        res.render("./alquiler4",{sess:req.session,tab:"servicios",title:"alquiler paso 4",resumen,mis_datos_pago:usuarioActual.datos_pago,id,status});
    },
    alquiler_paso4:async (req,res) =>{
        try {
            let {id} = req.params;
            let sess = req.session;
            const {mis_datos,metodo,email,address,province,dni,cardNumber,cvv,cardOwner,month,year} = req.body;
            let reservaActual = await reservas.findOne({where:{id},include:[{model:usuarios,as:"usuario"},{model:opcion_alquileres,as:"opcion"},{model:eventos,as:"evento"},{model:vehiculos,as:"vehiculo"}]});
            let precio_vehiculo = reservaActual.vehiculo.dataValues.precio_vuelta;
            let cantidad_vueltas = reservaActual.opcion.dataValues.cantidadVueltas;
            if(metodo == "transferencia_deposito"){
                let nuevo_pago_pendiente = await pagos_pendientes.create({idUsuario:sess.idUser,metodo,archivo:req.file.filename,idReserva:id,total:(precio_vehiculo*cantidad_vueltas)});
                res.redirect("/usuarios/mis_pagos_pendientes?status=reservado");
            }
            else if(metodo == "tarjeta_credito_debito"){
                let nuevo_datos_pago = await datos_pagos.create({direccion:address,dni,email,titular:cardOwner,numero_tarjeta:cardNumber,cvv,estado:province,vencimiento:month+"/"+year});
                let nuevo_pago_pendiente = await pagos_pendientes.create({idUsuario:sess.idUser,metodo,idReserva:id,total:(precio_vehiculo*cantidad_vueltas),idDatosPago:nuevo_datos_pago.id});
                res.redirect("/usuarios/mis_pagos_pendientes?status=reservado");
            }
            /*if(mis_datos){
                let usuarioActual = await usuarios.findOne({where:{id:sess.idUser},include:[{model:datos_pagos,as:"datos_pago"}]});
                
                
                if(usuarioActual.datos_pago == null){
                    res.redirect("/servicios/alquiler4/"+id+"?status=ningun_datos_pago")
                    return false;
                }


                let nuevo_pago_pendiente = await pagos_pendientes.create({idUsuario:sess.idUser,metodo:"mis datos de pago",idReserva:id,idDatosPago:usuarioActual.idDatosPago,total:(precio_vehiculo*cantidad_vueltas)});
                res.redirect("/usuarios/mis_pagos_pendientes?status=reservado");
    
            }*/
            //else{
            //}
        } catch (error) {
            console.log(error)
        }
    },
    
    
}
module.exports = alquileresController;

