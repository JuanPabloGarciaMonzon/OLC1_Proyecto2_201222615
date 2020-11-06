"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("../Instrucciones/Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Relacional extends instruccion_1.Instruccion {
    constructor(operando1, operando2, operador, fila, columna) {
        super(fila, columna);
        this.operador = operador;
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("RELACIONAL");
            nodo.agregarHijo2(this.operando1.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo2(this.operando2.getNodo());
            return nodo;    
        } catch (error) {
            console.log("RELACIONAL_GETNODO_ERROR:"+error)             
        }

    }
    traducir() {
        try {
            var op1 = this.operando1.traducir();
            if (op1 instanceof (Error_1.default))
            return op1;
            var op2 = this.operando2.traducir();
            if (op2 instanceof (Error_1.default))
            return op2;

            return op1 + this.operador + op2 + "";   
        } catch (error) {
            console.log("RELACIONAL_TRADUCIR_ERROR:"+error) 
        }

    }
}
exports.default = Relacional;
//# sourceMappingURL=Relacional.js.map