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
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print(expresion, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.expresion = expresion;
        return _this;
    }
    Print.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("PRINT");
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    };
    Print.prototype.traducir = function () {
        var value = this.expresion.traducir();
        return "console.log( " + value + " );\n";
    };
    return Print;
}(instruccion_1.Instruccion));
exports["default"] = Print;
