var express = require('express');
var router = express.Router();
let usuariosController = require("../controller/usuarios");
let reservasController = require("../controller/reservas");
let pagos_pendientesController = require("../controller/pagos_pendientes");
let userRolValidation = require("../middlewares/userRolValidation");

router.get("/mi_cuenta",userRolValidation("any"),usuariosController.mi_cuenta);
router.get("/datos_pago",userRolValidation("any"),usuariosController.datos_pago);
router.post("/datos_pago",userRolValidation("any"),usuariosController.guardar_datos_pago);
router.get("/mis_ordenes",reservasController.mis_ordenes);
router.get("/mis_pagos_pendientes",userRolValidation("any"),pagos_pendientesController.mis_pagos_pendientes);
router.post("/enviar_comprobante",userRolValidation("any"),pagos_pendientesController.enviar_comprobante);


module.exports = router;
