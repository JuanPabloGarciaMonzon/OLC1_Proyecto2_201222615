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
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(instrucciones, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.instrucciones = instrucciones;
        return _this;
    }
    Main.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("MAIN");
        nodo.agregarHijo("public");
        nodo.agregarHijo("static");
        nodo.agregarHijo("void");
        nodo.agregarHijo("main");
        nodo.agregarHijo("(");
        nodo.agregarHijo("String");
        nodo.agregarHijo("[");
        nodo.agregarHijo("]");
        nodo.agregarHijo("args");
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES");
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var m = _a[_i];
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    };
    Main.prototype.traducir = function () {
        var instrucciones = '';
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var instr = _a[_i];
            instrucciones += instr.traducir();
        }
        return "public static void main (String [] args){\n" + instrucciones + "\n}\n";
    };
    return Main;
}(instruccion_1.Instruccion));
exports["default"] = Main;
