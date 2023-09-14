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
    store:async (req,res) =>{
        try{
            const {model,brand,year,power,weight,level,description,traction,lap_price} = req.body;
            let result = await vehiculos.create({
                modelo:model,marca:brand,traccion:traction,año:year,potencia:power,peso:weight,nivel:level,descripcion:description,precio_vuelta:lap_price
            });
            
            if(result){
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