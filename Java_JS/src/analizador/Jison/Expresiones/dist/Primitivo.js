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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var instruccion_1 = require("../Abstract/instruccion");
var nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
var Primitivo = /** @class */ (function (_super) {
    __extends(Primitivo, _super);
    function Primitivo(valor, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Primitivo.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("PRIMITIVO");
        if (this.valor[0] == '"' || this.valor[0] == "'") {
            nodo.agregarHijo(this.valor.substr(1, this.valor.length - 2));
        }
        else {
            nodo.agregarHijo(this.valor);
        }
        return nodo;
    };
    Primitivo.prototype.traducir = function () {
        return this.valor;
    };
    return Primitivo;
}(instruccion_1.Instruccion));
exports["default"] = Primitivo;
