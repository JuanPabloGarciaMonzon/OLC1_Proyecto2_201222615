"use strict";
exports.__esModule = true;
var Error_Table = /** @class */ (function () {
    function Error_Table(lexema, fila, columna, tipo) {
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
    }
    Error_Table.prototype.errorTable = function () {
        console.log("ESTO ES PRUEBA:" + this.lexema);
    };
    return Error_Table;
}());
exports["default"] = Error_Table;
