"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var instruccion_1 = require("../Abstract/instruccion");
var nodoAST_1 = require("../Abstract/nodoAST");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(identificador, expresion, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.identificador = identificador;
        _this.expresion = expresion;
        return _this;
    }
    Declaracion.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("ASIGNACION");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    };
    Declaracion.prototype.traducir = function () {
        var value = this.expresion.traducir();
        return this.identificador + " = " + value + " ;\n";
    };
    return Declaracion;
}(instruccion_1.Instruccion));
exports["default"] = Declaracion;
