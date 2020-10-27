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
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(tipo, identificador, parametros, instrucciones, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.identificador = identificador;
        _this.instrucciones = instrucciones;
        _this.parametros = parametros;
        return _this;
    }
    Funcion.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("FUNCION");
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
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES");
        for (var _b = 0, _c = this.instrucciones; _b < _c.length; _b++) {
            var m = _c[_b];
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    };
    Funcion.prototype.traducir = function () {
        var instrucciones = '';
        var parametros = '';
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var instr = _a[_i];
            instrucciones += instr.traducir();
        }
        for (var _b = 0, _c = this.parametros; _b < _c.length; _b++) {
            var par = _c[_b];
            parametros += par.traducir();
        }
        return "public " + this.tipo + " " + this.identificador + " (" + parametros + ")\n {\n" + instrucciones + "\n}\n";
    };
    return Funcion;
}(instruccion_1.Instruccion));
exports["default"] = Funcion;
