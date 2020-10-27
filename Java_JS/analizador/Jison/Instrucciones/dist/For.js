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
var For = /** @class */ (function (_super) {
    __extends(For, _super);
    function For(condicion, condicion1, condicion2, instrucciones, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.condicion1 = condicion1;
        _this.condicion2 = condicion2;
        _this.instrucciones = instrucciones;
        return _this;
    }
    For.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("FOR");
        nodo.agregarHijo("for");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion1.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion2.getNodo());
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
    For.prototype.traducir = function () {
        var condicion = this.condicion.traducir();
        var condicion1 = this.condicion1.traducir();
        var condicion2 = this.condicion2.traducir();
        var instrucciones = '';
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var instr = _a[_i];
            instrucciones += instr.traducir();
        }
        return "for ( " + condicion + ";" + condicion1 + ";" + condicion2 + " ) {\n" + instrucciones + "\n}\n";
    };
    return For;
}(instruccion_1.Instruccion));
exports["default"] = For;
