const userRolValidation = (type) =>{
    return (req, res, next) => {
        let sess = req.session ?? null;
        if(sess && sess.idUser){
            if(type == "any"){
                next()
            }
            else if(type == sess.rol){
                next()
            }
            else{
                res.redirect("/servicios/alquiler?status=acceso_denegado")
            }
        }
        else{
            res.redirect("/login/")
        }
    }
}
module.exports = userRolValidation;
