const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres}  = require("../database/models");
let indexController = {
    home:async (req, res) => {
        try {
            res.redirect("/servicios/alquiler")
            //res.render("./home",{title:"Home"});
        } catch (error) {
            console.log(error);
        }
        
    },
    login:(req,res)=>{
        res.render("./login",{title:"Login"});
    },
    logear:async (req,res)=>{
        try{
            const {password,email} = req.body;
            let result = await usuarios.findOne({where:{password:password,email:email}});
            
            if(result){
                sess = req.session;
                sess.email = result.email;
                sess.nombre = result.nombre;
                sess.telefono = result.telefono;
                sess.idUser = result.id;
                req.session.save(function(err) {
                    console.log("saved");
                })
                res.redirect("/servicios/alquiler")
            }
            else{
                res.render("./login",{error:true});
            }
        }
        catch(e){
            console.log(e);
            //res.redirect("/users/login");
        }

    },
    logout:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/index/login");
    },
}

module.exports = indexController;