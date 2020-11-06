"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Comentario extends instruccion_1.Instruccion {
    constructor(comentario ,fila, columna) {
        super(fila, columna);
        this.comentario = comentario;
        
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("EXCEPCION");
            nodo.excepcion();
            return nodo;    
        } catch (error) {
            console.log("GETNODO_EXC:"+error);   
        }

    }
    traducir() {
        try {
            return `\n${this.comentario} \n`;  
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error);    
        }

    }
}
exports.default = Comentario;
//# sourceMappingURL=Aritmetica.js.map