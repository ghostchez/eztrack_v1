const userRolValidation = (type) =>{
    return (req, res, next) => {
        let sess = req.session ?? null;
        if(sess && sess.idUser){

            next()
        }
        else{
            res.redirect("/login/")
        }
        /*if(sess && sess.rols && sess.rols.length > 0){
            let correctRol = (type == "any") ? true : false;
            sess.rols.forEach((r)=>{
                if(r.rol == type){
                    correctRol = true;
                }
            });
            if(correctRol){
                next()
            }else{
                req.flash('error_messages', {title:"rol invalido",description:"Usuario actual no tiene permiso necesario :"+type});
                res.redirect("/")
            }
        }
        else{
            req.flash('error_messages', {title:"rol invalido",description:"Usuario actual no tiene permiso necesario :"+type});
            res.redirect("/index/login/")
        }   */
    }
}
module.exports = userRolValidation;
