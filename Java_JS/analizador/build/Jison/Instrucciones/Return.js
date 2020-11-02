"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Return extends instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("RETURN");
            nodo.agregarHijo("return");
            nodo.agregarHijo2(this.instrucciones.getNodo());
            nodo.agregarHijo(";");
            return nodo;  
        } catch (error) {
            console.log("GETNODO_EXC:"+error); 
        }

    }
    traducir() {
        try {
            return `\nreturn ${this.instrucciones.traducir()};\n`;  
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error);  
        }

        
    }
}
exports.default = Return;
//# sourceMappingURL=Return.js.map