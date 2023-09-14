const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let reservasController = {
    create:async (req, res) => {
        let eventos_list = await eventos.findAll();
        res.render("./eventos",{sess:req.session,tab:"gestion",title:"eventos",eventos_list});
    },
    store:async (req,res) =>{
        try{
            const {name,name_event,name_autodrome,location,city,date_from,date_to} = req.body;
            let result = await eventos.create({
                nombre:name,nombre_evento:name_event,nombre_autodromo:name_autodrome,url_ubicacion:location,ciudad:city,fecha_desde:date_from,fecha_hasta:date_to
            });
            
            if(result){
                res.redirect("/admin/eventos?result=success");
            }
            else{
                res.redirect("/admin/eventos?result=error");
            }
        }
        catch(error){
        }
    },
}

module.exports = reservasController;