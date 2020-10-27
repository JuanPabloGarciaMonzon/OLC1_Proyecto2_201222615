"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Continue extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("CONTINUE");
            nodo.agregarHijo("continue");
            nodo.agregarHijo(";");
            return nodo;    
        } catch (error) {
            console.log("GETNODO_EXC:"+error);   
        }

    }
    traducir() {
        try {
            return `continue;\n`; 
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = Continue;
//# sourceMappingURL=Continue.js.map