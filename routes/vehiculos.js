var express = require('express');
var router = express.Router();
let vehiculosController = require("../controller/vehiculos");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/lista_vehiculos'/*,userRolValidation("administrador")*/,vehiculosController.lista_vehiculos);
router.get('/alquiler/:id'/*,userRolValidation("administrador")*/,vehiculosController.alquiler);
router.post('/alquiler_paso2'/*,userRolValidation("administrador")*/,vehiculosController.alquiler_paso2);
router.post('/alquiler_paso3'/*,userRolValidation("administrador")*/,vehiculosController.alquiler_paso3);
router.get('/alquiler2/:id'/*,userRolValidation("administrador")*/,vehiculosController.alquiler2);
router.get('/alquiler3/:id'/*,userRolValidation("administrador")*/,vehiculosController.alquiler3);
router.get('/'/*,userRolValidation("administrador")*/,vehiculosController.create);
router.post('/'/*,userRolValidation("administrador")*/,vehiculosController.store);


module.exports = router;
