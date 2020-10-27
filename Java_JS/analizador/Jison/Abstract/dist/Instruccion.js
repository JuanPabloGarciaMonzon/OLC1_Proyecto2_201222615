"use strict";
exports.__esModule = true;
exports.Instruccion = void 0;
var Instruccion = /** @class */ (function () {
    function Instruccion(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    Instruccion.prototype.setSalida = function (salida) {
        this.salida = salida;
    };
    Instruccion.prototype.getSalida = function () {
        return this.salida;
    };
    return Instruccion;
}());
exports.Instruccion = Instruccion;
