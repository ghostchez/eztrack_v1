let express = require('express');
let router = express.Router();
let vehiculosController = require("../controller/vehiculos");
let eventosController = require("../controller/eventos");
let usuariosController = require('../controller/usuarios');
let reservasController = require('../controller/reservas');
let pagosPendientesController = require('../controller/pagos_pendientes');
let userRolValidation = require("../middlewares/userRolValidation");

router.get('/vehiculos',userRolValidation("administrador"),vehiculosController.create);
router.get('/vehiculos/:id',userRolValidation("administrador"),vehiculosController.edit);
router.post('/vehiculos',userRolValidation("administrador"),vehiculosController.store);
router.delete('/vehiculos/:id',userRolValidation("administrador"),vehiculosController.delete);
router.put('/vehiculos/:id',userRolValidation("administrador"),vehiculosController.update);
router.get('/eventos',userRolValidation("administrador"),eventosController.create);
router.post('/eventos',userRolValidation("administrador"),eventosController.store);
router.delete('/eventos/:id',userRolValidation("administrador"),eventosController.delete);
router.get('/reservas',userRolValidation("administrador"),reservasController.create);
router.get('/usuarios',userRolValidation("administrador"),usuariosController.create);
router.get('/pagos',userRolValidation("administrador"),pagosPendientesController.lista);
router.post('/usuarios',userRolValidation("administrador"),usuariosController.store);


module.exports = router;
