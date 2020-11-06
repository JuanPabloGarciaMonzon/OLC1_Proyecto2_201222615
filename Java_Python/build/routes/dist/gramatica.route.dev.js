"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = require("express");

var router = express_1.Router();

var gramatica_controller_1 = require("../controller/gramatica.controller");

router.post('/', gramatica_controller_1.gramaticaController.ejecutar);
exports["default"] = router;