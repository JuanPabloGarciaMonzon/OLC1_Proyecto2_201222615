"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Primitivo extends instruccion_1.Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("PRIMITIVO");
            if (this.valor[0] == '"' || this.valor[0] == "'") {
                nodo.agregarHijo(this.valor.substr(1, this.valor.length - 2));
            }
            else {
                nodo.agregarHijo(this.valor);
            }
            return nodo;    
        } catch (error) {
            console.log("PRIMITIVO_GETNODO_ERROR:"+error)   
        }

    }
    traducir() {
        try {
            return this.valor;   
        } catch (error) {
            console.log("PRIMITIVO_TRADUCIR_ERROR:"+error) 
        }

    }
}
exports.default = Primitivo;
//# sourceMappingURL=Primitivo.js.map