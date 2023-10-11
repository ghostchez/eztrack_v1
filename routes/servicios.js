var express = require('express');
var router = express.Router();
let alquileresController = require("../controller/alquileres");
let userRolValidation = require("../middlewares/userRolValidation");

router.get('/alquiler'/*,userRolValidation("administrador")*/,alquileresController.alquiler);

router.get('/alquiler2/:id',userRolValidation("any"),alquileresController.alquiler2);
router.post('/alquiler_paso2',userRolValidation("any"),alquileresController.alquiler_paso2);
router.get('/alquiler3/:id',userRolValidation("any"),alquileresController.alquiler3);
router.post('/alquiler_paso3',userRolValidation("any"),alquileresController.alquiler_paso3);
router.get('/alquiler4/:id',userRolValidation("any"),alquileresController.alquiler4);
router.post('/alquiler_paso4/:id',userRolValidation("any"),alquileresController.alquiler_paso4);



module.exports = router;
