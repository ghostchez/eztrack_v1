var express = require('express');
var router = express.Router();
let usuariosController = require("../controller/usuarios");
let userRolValidation = require("../middlewares/userRolValidation");

router.get("/mi_cuenta",usuariosController.mi_cuenta);
router.get("/datos_pago",usuariosController.datos_pago);
router.get("/mis_ordenes",usuariosController.mis_ordenes);


module.exports = router;
