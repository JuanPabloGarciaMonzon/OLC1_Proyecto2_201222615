"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("BREAK");
            nodo.agregarHijo("break");
            nodo.agregarHijo(";");
            return nodo;    
        } catch (error) {
            console.log("BREAK_GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            return `\nbreak;\n`;   
        } catch (error) {
            console.log("BREAK_TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Break;
//# sourceMappingURL=Break.js.map