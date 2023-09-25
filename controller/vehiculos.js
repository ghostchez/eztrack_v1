const session = require("express-session");

const {usuarios,vehiculos,eventos,reservas,opcion_alquileres} = require("../database/models");


let vehiculosController = {
    create:async (req,res) =>{
        try {
            let vehiculos_list = await vehiculos.findAll();
            res.render("./vehiculos",{sess:req.session,tab:"gestion",title:"vehiculos",vehiculos_list});
        } catch (error) {
            console.log(error)
        }
    },
    store:async (req,res,next) =>{
        try{
            const {model,brand,year,power,weight,level,description,traction,lap_price} = req.body;
            let result = await vehiculos.create({
                modelo:model,marca:brand,traccion:traction,año:year,potencia:power,peso:weight,nivel:level,descripcion:description,precio_vuelta:lap_price
            });
            console.log("aca");

            if(result){
                let update_image = await vehiculos.update({img:req.file.filename},{where:{id:result.id}});
                res.redirect("/admin/vehiculos?result=success");

            }
            else{
                res.redirect("/admin/vehiculos?result=error");
            }
        }
        catch(error){
        }
    },
    edit:async (req,res) =>{
        try {
            let {id} = req.params;
            let vehiculos_list = await vehiculos.findAll();
            let vehiculo_editar = await vehiculos.findOne({where:{id}});
            res.render("./vehiculos",{sess:req.session,tab:"gestion",title:"vehiculos",vehiculos_list,vehiculo_editar});
        } catch (error) {
            console.log(error)
        }
    },
    update:async (req,res,next) =>{
        try{
            let {id} = req.params;
            const {model,brand,year,power,weight,level,description,traction,lap_price} = req.body;
            let result = await vehiculos.update({
                modelo:model,marca:brand,traccion:traction,año:year,potencia:power,peso:weight,nivel:level,descripcion:description,precio_vuelta:lap_price
            },{where:{id}});
            if(result){
                let update_image = await vehiculos.update({img:req.file.filename},{where:{id:result.id}});
                res.redirect("/admin/vehiculos?result=success");
            }
            else{
                res.redirect("/admin/vehiculos?result=error");
            }
        }
        catch(error){
        }
    },
}
module.exports = vehiculosController;