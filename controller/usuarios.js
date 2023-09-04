const session = require("express-session");
const {usuarios} = require("../database/models");

let usuariosController = {
    list:async (req,res) =>{
        let usuarios_habilitados = await users.findAll({where:{active:1}});
        let usuarios_deshabilitados = await users.findAll({where:{active:0}});

        let usuarios = await users.findAll({include:{model:rols}});
        res.render("./list_users",{usuarios,usuarios_habilitados,usuarios_deshabilitados});
    },
    login:(req,res)=>{
        res.render("./login");
    },
    logout:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/usuarios/login");
    },
    mi_cuenta:(req,res)=>{
        console.log(req.session);
        res.render("./mi_cuenta",{tab:"usuarios",title:"mi_cuenta"});
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
                res.redirect("./mi_cuenta");
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
}
module.exports = usuariosController;