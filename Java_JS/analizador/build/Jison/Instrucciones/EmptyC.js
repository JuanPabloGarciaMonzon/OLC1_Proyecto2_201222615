"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class EmptyC extends instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("CLASE");
            nodo.agregarHijo("public");
            nodo.agregarHijo("class");
            nodo.agregarHijo(this.identificador);

            nodo.agregarHijo("{");
            var el = new nodoAST_1.default("EXCEPCION");           
            nodo.excepcion();
            nodo.agregarHijo("}");
            return nodo;     
        } catch (error) {
            console.log("EMPYTC_GETNODO_EXC:"+error);
        }

    }
    traducir() {
        try {
            return `public class ${this.identificador}\n {\n}\n`;   
        } catch (error) {
            console.log("EMPYTC_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = EmptyC;
//# sourceMappingURL=Metodo.js.map