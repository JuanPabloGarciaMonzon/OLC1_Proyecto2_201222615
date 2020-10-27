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
var Break = /** @class */ (function (_super) {
    __extends(Break, _super);
    function Break(linea, columna) {
        return _super.call(this, linea, columna) || this;
    }
    Break.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("BREAK");
        nodo.agregarHijo("break");
        nodo.agregarHijo(";");
        return nodo;
    };
    Break.prototype.traducir = function () {
        return "break;\n";
    };
    return Break;
}(instruccion_1.Instruccion));
exports["default"] = Break;
