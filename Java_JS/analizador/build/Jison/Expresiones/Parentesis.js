"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Parentesis extends instruccion_1.Instruccion {
        constructor(parA, operando1, parC, fila, columna) {
            super(fila,columna);
            this.parA = parA;
            this.operando1 = operando1;        
            this.parC = parC;
        }
        getNodo() {
            var nodo = new nodoAST_1["default"]("EXPRESION");
            nodo.agregarHijo2(this.operando1.getNodo());
            return nodo;
        }
        traducir() {
            return this.parA + this.operando1.traducir() + this.parC + "";
        }
    }
    exports.default = Parentesis;
    //# sourceMappingURL=Relacional.js.map
