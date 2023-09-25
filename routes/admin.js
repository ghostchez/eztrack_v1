let express = require('express');
let router = express.Router();
let vehiculosController = require("../controller/vehiculos");
let eventosController = require("../controller/eventos");
let usuariosController = require('../controller/usuarios');
let reservasController = require('../controller/reservas');
let userRolValidation = require("../middlewares/userRolValidation");

router.get('/vehiculos',userRolValidation("administrador"),vehiculosController.create);
router.get('/vehiculos/:id',userRolValidation("administrador"),vehiculosController.edit);
router.post('/vehiculos',userRolValidation("administrador"),vehiculosController.store);
router.put('/vehiculos/:id',userRolValidation("administrador"),vehiculosController.update);
router.get('/eventos',userRolValidation("administrador"),eventosController.create);
router.post('/eventos',userRolValidation("administrador"),eventosController.store);
router.get('/reservas',userRolValidation("administrador"),reservasController.create);
router.get('/usuarios',userRolValidation("administrador"),usuariosController.create);
router.post('/usuarios',userRolValidation("administrador"),usuariosController.store);


module.exports = router;
