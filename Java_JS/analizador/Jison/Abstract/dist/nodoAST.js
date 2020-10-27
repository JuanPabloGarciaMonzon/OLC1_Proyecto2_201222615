"use strict";
exports.__esModule = true;
var nodoAST = /** @class */ (function () {
    function nodoAST(valor) {
        this.hijos = new Array();
        this.valor = valor;
    }
    nodoAST.prototype.setHijos = function (hijos) {
        this.hijos = hijos;
    };
    nodoAST.prototype.agregarHijo = function (cad) {
        this.hijos.push(new nodoAST(cad));
    };
    nodoAST.prototype.agregarHijos = function (hijos) {
        for (var _i = 0, hijos_1 = hijos; _i < hijos_1.length; _i++) {
            var hijo = hijos_1[_i];
            this.hijos.push(hijo);
        }
    };
    nodoAST.prototype.agregarHijo2 = function (hijo) {
        this.hijos.push(hijo);
    };
    nodoAST.prototype.agregarPrimerHijo = function (cad) {
        this.hijos.unshift(new nodoAST(cad));
    };
    nodoAST.prototype.agregarPrimerHijo2 = function (hijo) {
        this.hijos.unshift(hijo);
    };
    nodoAST.prototype.getValor = function () {
        return this.valor;
    };
    nodoAST.prototype.setValor = function (cad) {
        this.valor = cad;
    };
    nodoAST.prototype.getHijos = function () {
        return this.hijos;
    };
    return nodoAST;
}());
exports["default"] = nodoAST;
