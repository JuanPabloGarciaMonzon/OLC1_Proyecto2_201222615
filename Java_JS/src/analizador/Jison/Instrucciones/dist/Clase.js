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
var Clase = /** @class */ (function (_super) {
    __extends(Clase, _super);
    function Clase(identificador, instrucciones, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.identificador = identificador;
        _this.instrucciones = instrucciones;
        return _this;
    }
    Clase.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("CLASE");
        nodo.agregarHijo("public");
        nodo.agregarHijo("class");
        nodo.agregarHijo(this.identificador);
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
    Clase.prototype.traducir = function () {
        var instrucciones = '';
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var instr = _a[_i];
            instrucciones += instr.traducir();
        }
        return "public class " + this.identificador + " {\n" + instrucciones + "\n}\n";
    };
    return Clase;
}(instruccion_1.Instruccion));
exports["default"] = Clase;
