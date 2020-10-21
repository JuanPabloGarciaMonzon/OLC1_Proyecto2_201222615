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
var Comentario = /** @class */ (function (_super) {
    __extends(Comentario, _super);
    function Comentario(comentario, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.comentario = comentario;
        return _this;
    }
    Comentario.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("COMENTARIO");
        nodo.agregarHijo(this.comentario);
        return nodo;
    };
    Comentario.prototype.traducir = function () {
        return this.comentario + "\n";
    };
    return Comentario;
}(instruccion_1.Instruccion));
exports["default"] = Comentario;
