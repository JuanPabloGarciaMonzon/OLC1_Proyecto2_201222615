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
var Do_While = /** @class */ (function (_super) {
    __extends(Do_While, _super);
    function Do_While(instrucciones, condicion, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.instrucciones = instrucciones;
        return _this;
    }
    Do_While.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("DOWHILE");
        nodo.agregarHijo("do");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES");
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var m = _a[_i];
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    };
    Do_While.prototype.traducir = function () {
        var condicion = this.condicion.traducir();
        var instrucciones = '';
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var instr = _a[_i];
            instrucciones += instr.traducir();
        }
        return "do {\n" + instrucciones + "\n}\n while( " + condicion + " );";
    };
    return Do_While;
}(instruccion_1.Instruccion));
exports["default"] = Do_While;
