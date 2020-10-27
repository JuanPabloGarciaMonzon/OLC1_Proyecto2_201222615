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
var Funcion_Main = /** @class */ (function (_super) {
    __extends(Funcion_Main, _super);
    function Funcion_Main(parametros, instrucciones, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.instrucciones = instrucciones;
        _this.parametros = parametros;
        return _this;
    }
    Funcion_Main.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("FUNCION_MAIN");
        nodo.agregarHijo("public");
        nodo.agregarHijo("static");
        nodo.agregarHijo("void");
        nodo.agregarHijo("main");
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
    Funcion_Main.prototype.traducir = function () {
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
        return "public static void main (" + parametros + ")\n {\n" + instrucciones + "\n}\n";
    };
    return Funcion_Main;
}(instruccion_1.Instruccion));
exports["default"] = Funcion_Main;
