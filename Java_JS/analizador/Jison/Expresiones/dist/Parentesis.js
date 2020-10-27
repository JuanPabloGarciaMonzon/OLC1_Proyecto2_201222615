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
var Parentesis = /** @class */ (function (_super) {
    __extends(Parentesis, _super);
    function Parentesis(parA, operando1, parC, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.parA = parA;
        _this.operando1 = operando1;
        _this.parC = parC;
        return _this;
    }
    Parentesis.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("EXPRESION");
        nodo.agregarHijo2(this.operando1.getNodo());
        return nodo;
    };
    Parentesis.prototype.traducir = function () {
        return this.parA + this.operando1.traducir() + this.parC + "";
    };
    return Parentesis;
}(instruccion_1.Instruccion));
exports["default"] = Parentesis;
