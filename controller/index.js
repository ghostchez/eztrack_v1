const session = require("express-session");
const { Op } = require("sequelize");
const {usuarios,vehiculos,eventos,reservas,opcion_alquileres,roles}  = require("../database/models");
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
        let status = req.query.status ?? null;
        res.render("./login",{title:"Login",error:req.query.error,status});
    },
    logear:async (req,res)=>{
        try{
            const {password,email} = req.body;
            let result = await usuarios.findOne({where:{password:password,email:email},include:[{model:roles,as:"rol"}]});
            if(result){
                sess = req.session ?? null;
                sess.email = result.email;
                sess.nombre = result.nombre;
                sess.telefono = result.telefono;
                sess.idUser = result.id;
                sess.idUser = result.id;
                sess.rol = result.rol.rol;
                req.session.save(function(err) {
                    console.log("saved");
                })
                res.redirect("/servicios/alquiler")
            }
            else{
                res.redirect("/login?error=true")
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
        res.redirect("/login");
    },
}

module.exports = indexController;