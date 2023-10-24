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
function ValidatePassword(password,min = false,max = false) 
{
    let regex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{'+ ((min) ? min : 1)  +','+ ((max) ? max : 10000)  +'}$');
    

    if (regex.test(password)){
        return true
    }else{
        return false
    }
}
function ValidateAlphanumeric(text,min = false,max = false) 
{
    let regex = new RegExp('^([a-zA-Z0-9]){'+ ((min) ? min : 1)  +','+ ((max) ? max : 10000)  +'}$');
    if (regex.test(text.trimEnd())){
        return true
    }else{
        return false
    }
}
function ValidateAlphanumeric_space(text,min = false,max = false) 
{
    let regex = new RegExp('^([a-zA-Z0-9 ]){'+ ((min) ? min : 1)  +','+ ((max) ? max : 10000)  +'}$');
    if (regex.test(text.trimEnd())){
        return true
    }else{
        return false
    }
}
function ValidateText(text,min = false,max = false) 
{
    let regex = new RegExp('^([a-zA-ZÀ-ú0-9 -/,.:"\']){'+ ((min) ? min : 1)  +','+ ((max) ? max : 10000)  +'}$');
    
    if (regex.test(text.trimEnd())){
        return true
    }else{
        return false
    }
}
function ValidateNumber(number,min = false,max = false) 
{
    let regex = new RegExp('^([0-9]){'+ ((min) ? min : 1)  +','+ ((max) ? max : 10000)  +'}$');
    
    if (regex.test(number)){
        return true
    }else{
        return false
    }
}
let array_timeout = [];
forms.forEach(form => {
    let no_error = false;
    form.addEventListener("submit",(e)=>{
        if(form.dataset.validationException && form.dataset.validationExceptionType == "checkbox"){
            if(document.querySelector("#"+form.dataset.validationException).checked == true){
                no_error = true;
                form.submit();
            }
        }
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
                validacion_resultado = ValidateNumber(field.value,min_max[0],min_max[1]);
            else if(type == "alphanumeric_space") 
                validacion_resultado = ValidateAlphanumeric_space(field.value,min_max[0],min_max[1]);
            else if(type == "alphanumeric") 
                validacion_resultado = ValidateAlphanumeric(field.value,min_max[0],min_max[1]);
            else if(type == "text") 
                validacion_resultado = ValidateText(field.value,min_max[0],min_max[1]);
            
            obj_resultados[field.id] = validacion_resultado;
        });
        for (let index = 0; index < array_timeout.length; index++) {
            //console.log(array_timeout[index]);
            clearTimeout(array_timeout[index]);
        }
        array_timeout = [];
        let positive_result = 0;
        for (const [key, value] of Object.entries(obj_resultados)) {
            document.querySelector("#"+key).parentNode.querySelector(".error-validacion").classList.remove("activo");
            if(value == true) positive_result ++;
            else{
                
                document.querySelector("#"+key).parentNode.querySelector(".error-validacion").classList.add("activo");
                let time = setTimeout(() => {
                    document.querySelector("#"+key).parentNode.querySelector(".error-validacion").classList.remove("activo");
                }, 5000);
                array_timeout.push(time);
            }
        }

        if(positive_result == cantidad_field){
            no_error = true;
            form.submit();
        } 
    });
});