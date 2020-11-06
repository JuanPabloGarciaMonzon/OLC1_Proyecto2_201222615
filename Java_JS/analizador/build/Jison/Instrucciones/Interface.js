"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Error_1 = __importDefault(require("./Error"));
class Interface extends instruccion_1.Instruccion {
    constructor(identificador, instrucciones, linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("INTERFACE");
            nodo.agregarHijo("public");
            nodo.agregarHijo("interface");
            nodo.agregarHijo(this.identificador);
            nodo.agregarHijo("{");
            var cas = new nodoAST_1.default("INSTRUCCIONES");
            for (let m of this.instrucciones) {
                if (m instanceof Error_1.default)
                 continue;
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            return nodo;    
        } catch (error) {
            console.log("INTERFACE_GETNODO_EXC:"+error);
        }

    }
    traducir() {
        try {
            return `\n`;   
        } catch (error) {
            console.log("INTERFACE_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = Interface;
//# sourceMappingURL=Interface.js.map