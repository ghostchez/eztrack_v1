/* - Validacion de todos los inputs automatizada - */
let forms = document.querySelectorAll(".form-validate");

function ValidateEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true
    }else{
        return false
    }
}
function ValidatePassword(password,min,max) 
{
    let regex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{'+ min +','+ max +'}$');
    if (regex.test(password)){
        return true
    }else{
        return false
    }
}
function ValidateNumber(number) 
{
    if (/^\d+$/.test(number)){
        return true
    }else{
        return false
    }
}

forms.forEach(form => {
    let no_error = false;
    form.addEventListener("submit",(e)=>{
        if (!no_error)e.preventDefault();
        else{
            return true;
        }
        let fields = form.querySelectorAll(".validate");
        //arranca true y si algun campo devuelve error de validacion, entonces valid_form pasa a false y arroja error de formulario. 
        let cantidad_field = fields.length;
        let obj_resultados = {};
        fields.forEach(field => {
            let type = field.dataset.validationType;
            let length = field.dataset.validationLength ?? false;
            let min_max = (length) ? length.split("_") : [0,0];
            let validacion_resultado;
            if(type == "email") 
                validacion_resultado = ValidateEmail(field.value);
            else if(type == "password") 
                validacion_resultado = ValidatePassword(field.value,min_max[0],min_max[1]);
            else if(type == "number") 
                validacion_resultado = ValidateNumber(field.value);
            
            obj_resultados[field.id] = validacion_resultado;
        });
        
        let positive_result = 0;
        for (const [key, value] of Object.entries(obj_resultados)) {
            if(value == true) positive_result ++;
            else{
                console.log(key+" "+value);
                document.querySelector("#"+key).parentNode.querySelector(".error-validacion").classList.add("activo");
                setTimeout(() => {
                    document.querySelector("#"+key).parentNode.querySelector(".error-validacion").classList.remove("activo");
                }, 5000);

            }
        }
        if(positive_result == cantidad_field){
            no_error = true;
            form.submit();
        } 
    });
});