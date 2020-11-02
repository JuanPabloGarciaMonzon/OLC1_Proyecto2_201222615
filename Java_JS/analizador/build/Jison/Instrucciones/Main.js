"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Main extends instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("MAIN");
            nodo.agregarHijo("public");
            nodo.agregarHijo("static");
            nodo.agregarHijo("void");
            nodo.agregarHijo("main");
            nodo.agregarHijo("(");
            nodo.agregarHijo("String");
            nodo.agregarHijo("[");
            nodo.agregarHijo("]");
            nodo.agregarHijo("args");
            nodo.agregarHijo(")");
            nodo.agregarHijo("{");
            var cas = new nodoAST_1.default("INSTRUCCIONES");
            for (let m of this.instrucciones) {
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            return nodo;    
        } catch (error) {
            console.log("GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            var instrucciones = '';
            for (let instr of this.instrucciones) {
                instrucciones += instr.traducir();
            }
            return `\npublic static void main (String [] args){\n${instrucciones}\n}\n`;    
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error);    
        }

    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map