var express = require('express');
var router = express.Router();
let usuariosController = require("../controller/usuarios");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/list',userRolValidation("administrador"),usuariosController.list); //localhost:3001/users/list
router.get("/login",usuariosController.login);
router.post("/login",usuariosController.logear);
router.get("/mi_cuenta",usuariosController.mi_cuenta);


module.exports = router;
