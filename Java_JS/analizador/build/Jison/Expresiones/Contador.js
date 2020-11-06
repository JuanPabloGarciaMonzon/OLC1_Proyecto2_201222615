"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Contador extends instruccion_1.Instruccion {
    constructor(operador, operando1 ,fila, columna) {
        super(fila, columna);
        this.operador = operador;
        this.operando1 = operando1;
        
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("CONTADOR");

            nodo.agregarHijo(this.operando1 + "");
            nodo.agregarHijo(this.operador + "");
            return nodo;   
        } catch (error) {
            console.log("CONTADOR_GETNODO_ERROR:"+error) 
        }

    }
    traducir() {
        try {
            return `\n${this.operando1}${this.operador};\n`;    
        } catch (error) {
            console.log("CONTADOR_TRADUCIR_ERROR:"+error)
        }

    }
}
exports.default = Contador;
//# sourceMappingURL=Aritmetica.js.map