"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class EmptyI extends instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("INTERFACE");
            nodo.agregarHijo("public");
            nodo.agregarHijo("class");
            nodo.agregarHijo(this.identificador);

            nodo.agregarHijo("{");
            var el = new nodoAST_1.default("EXCEPCION");           
            nodo.excepcion();          
            nodo.agregarHijo("INSTRUCCIONES")
            nodo.agregarHijo("}");
            return nodo;     
        } catch (error) {
            console.log("EMPYI_GETNODO_EXC:"+error);
        }

    }
    traducir() {
        try {
            return `\n`;   
        } catch (error) {
            console.log("EMPYI_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = EmptyI;
//# sourceMappingURL=Metodo.js.map