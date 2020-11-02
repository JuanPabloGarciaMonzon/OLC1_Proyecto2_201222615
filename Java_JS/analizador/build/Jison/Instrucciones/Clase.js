"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Clase extends instruccion_1.Instruccion {
    constructor(identificador, instrucciones, linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
        this.instrucciones = instrucciones;
    }
    getNodo() {

        try {
            var nodo = new nodoAST_1.default("CLASE");
            nodo.agregarHijo("public");
            nodo.agregarHijo("class");
            nodo.agregarHijo(this.identificador);
            nodo.agregarHijo("{");
            var cas = new nodoAST_1.default("INSTRUCCIONES");
            for (let m of this.instrucciones) {
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            return nodo;     
        } catch (error) {
            console.log("CLASE_GETNODO_EXC:"+error);  
        }

    }
    traducir() {

        try {
            var instrucciones = '';
            for (let instr of this.instrucciones) {
                instrucciones += instr.traducir();
            }
            return `\nclass ${this.identificador} {\n${instrucciones}}\n`; 
        } catch (error) {
            console.log("CLASE_TRADUCIR_EXC:"+error);
        }

    }
}
exports.default = Clase;
//# sourceMappingURL=Clase.js.map