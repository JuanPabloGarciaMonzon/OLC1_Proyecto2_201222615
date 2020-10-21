"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var gramatica_route_1 = require("./analizador/routes/gramatica.route");
var app = express_1["default"]();
app.set('port', process.env.PORT || 3000);
app.use(express_1["default"].json({ limit: '50mb' }));
app.use(express_1["default"].urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1["default"]());
app.use('/jison', gramatica_route_1["default"]);
app.get('**', function (req, res) {
    res.send("Servidor Jison");
});
app.listen(app.get('port'), function () {
    console.log("Server on port " + app.get('port'));
});
