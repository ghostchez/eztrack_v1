const session = require("express-session");
const {usuarios,roles,datos_pagos} = require("../database/models");

let usuariosController = {
    create: async (req, res) => {
        let status = req.query.status ?? null;
        let lista_roles = await roles.findAll();
        let lista_usuarios = await usuarios.findAll();
        res.render("./usuarios",{sess:req.session,tab:"gestion",title:"usuarios",lista_roles,lista_usuarios,status});
    },
    store: async (req, res) => {
        try {
            let {firstName,lastName,password,password2,email,phoneNumber,rol} = req.body;

            if(password != password2){
                res.redirect("/admin/usuarios?status=password");
                throw "error";
            }
            let resultado = await usuarios.create({nombre:firstName+" "+lastName,email,password,telefono:phoneNumber,idRol:rol})
            if(resultado){
                res.redirect("/admin/usuarios?status=success");
            }
        } catch (error) {
            console.log(error)
        }
        
    },
    mi_cuenta:(req,res)=>{
        res.render("./mi_cuenta",{sess:req.session,tab:"usuarios",title:"Mi cuenta"});
    },
    datos_pago:async(req,res)=>{
        let sess = req.session;
        let status = req.query.status ?? null;
        let usuario_actual = await usuarios.findOne({where:{id:sess.idUser},include:[{model:datos_pagos,as:"datos_pago"}]});
        let mis_datos_pago = null;
        if(usuario_actual.datos_pago != null){
            mis_datos_pago = usuario_actual.datos_pago;
        }
        res.render("./datos_pago",{sess:req.session,tab:"usuarios",title:"Mis datos de pago",status,mis_datos_pago});
    },
    guardar_datos_pago:async (req,res)=>{
        try {
            let sess = req.session;
            if(typeof sess.idUser == "undefined"){
                res.redirect("/?status=session");
                return false;
            }
            let usuario_actual = await usuarios.findOne({where:{id:sess.idUser},include:[{model:datos_pagos,as:"datos_pago"}]});
            let {address,province,dni,email,bankOwner,bank} = req.body;
            if(usuario_actual.datos_pago == null){
                let result = await datos_pagos.create({direccion:address,estado:province,dni:dni,email,titular:bankOwner,banco:bank});
                if(result){
                    let usuario_editado = await usuarios.update({idDatosPago:result.id},{where:{id:sess.idUser}});
                    if(usuario_editado){
                        res.redirect("/usuarios/datos_pago?status=success");
                    }
                }
                else{
                    res.redirect("/usuarios/datos_pago?status=error");
    
                }
            }else{
                let result = await datos_pagos.update({direccion:address,estado:province,dni:dni,email,titular:bankOwner,banco:bank},{where:{id:usuario_actual.datos_pago.dataValues.id}});
                if(result){
                    res.redirect("/usuarios/datos_pago?status=edit_success");
                }else{
                    res.redirect("/usuarios/datos_pago?status=edit_error");
                }
            }
            
        
        } catch (error) {
            console.log(error)
        }
        
    },
    

    
}
module.exports = usuariosController;