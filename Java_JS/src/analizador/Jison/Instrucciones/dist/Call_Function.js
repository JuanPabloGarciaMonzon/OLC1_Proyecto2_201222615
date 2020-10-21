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
var Call_Function = /** @class */ (function (_super) {
    __extends(Call_Function, _super);
    function Call_Function(tipo, identificador, parametros, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.identificador = identificador;
        _this.parametros = parametros;
        return _this;
    }
    Call_Function.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("CALL");
        nodo.agregarHijo("public");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo("(");
        var par = new nodoAST_1["default"]("PARAMETROS");
        for (var _i = 0, _a = this.parametros; _i < _a.length; _i++) {
            var m = _a[_i];
            par.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(par);
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    };
    Call_Function.prototype.traducir = function () {
        var parametros = '';
        for (var _i = 0, _a = this.parametros; _i < _a.length; _i++) {
            var par = _a[_i];
            parametros += par.traducir();
        }
        return "public " + this.tipo + " " + this.identificador + " (" + parametros + ");\n";
    };
    return Call_Function;
}(instruccion_1.Instruccion));
exports["default"] = Call_Function;
