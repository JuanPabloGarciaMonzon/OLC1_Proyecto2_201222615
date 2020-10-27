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
var Continue = /** @class */ (function (_super) {
    __extends(Continue, _super);
    function Continue(linea, columna) {
        return _super.call(this, linea, columna) || this;
    }
    Continue.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("CONTINUE");
        nodo.agregarHijo("continue");
        nodo.agregarHijo(";");
        return nodo;
    };
    Continue.prototype.traducir = function () {
        return "continue;\n";
    };
    return Continue;
}(instruccion_1.Instruccion));
exports["default"] = Continue;
