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
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(operando1, operando2, operador, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.operador = operador;
        _this.operando1 = operando1;
        _this.operando2 = operando2;
        return _this;
    }
    Relacional.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("RELACIONAL");
        nodo.agregarHijo2(this.operando1.getNodo());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo2(this.operando2.getNodo());
        return nodo;
    };
    Relacional.prototype.traducir = function () {
        return this.operando1.traducir() + this.operador + this.operando2.traducir() + "";
    };
    return Relacional;
}(instruccion_1.Instruccion));
exports["default"] = Relacional;
