let express = require('express');
let router = express.Router();
let indexController = require("../controller/index");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get("/",userRolValidation("any"),indexController.home);
router.get("/login",indexController.login);
router.post("/login",indexController.logear);
router.get("/logout",indexController.logout);

module.exports = router;
