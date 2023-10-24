const session = require("express-session");

const {usuarios,vehiculos,eventos,reservas,opcion_alquileres} = require("../database/models");


let vehiculosController = {
    create:async (req,res) =>{
        try {
            let status = req.query.status ?? null;
            let vehiculos_list = await vehiculos.findAll();
            res.render("./vehiculos",{sess:req.session,tab:"gestion",title:"vehiculos",vehiculos_list,status});
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

            if(result){
                let update_image = await vehiculos.update({img:req.file.filename},{where:{id:result.id}});
                res.redirect("/admin/vehiculos?status=success");

            }
            else{
                res.redirect("/admin/vehiculos?status=error");
            }
        }
        catch(error){
        }
    },
    edit:async (req,res) =>{
        try {
            let status = req.query.status ?? null;

            let {id} = req.params;
            let vehiculos_list = await vehiculos.findAll();
            let vehiculo_editar = await vehiculos.findOne({where:{id}});
            res.render("./vehiculos",{sess:req.session,tab:"gestion",title:"vehiculos",vehiculos_list,vehiculo_editar,status});
        } catch (error) {
            console.log(error)
        }
    },
    delete:async (req,res) =>{
        try {
            let id = req.params.id;
            let vehiculo_borrar = await vehiculos.destroy({where:{id}});
            res.redirect("/admin/vehiculos?status=deleted");
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
                if(typeof req.file != "undefined"){
                    let update_image = await vehiculos.update({img:req.file.filename},{where:{id}});
                }
                res.redirect("/admin/vehiculos/"+id+"?status=success");
            }
            else{
                res.redirect("/admin/vehiculos/"+id+"?status=error");
            }
        }
        catch(error){
            console.log(error)
        }
    },
}
module.exports = vehiculosController;