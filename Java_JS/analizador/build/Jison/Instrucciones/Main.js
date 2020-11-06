"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
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
                if (m instanceof Error_1.default)
                 continue;
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            return nodo;    
        } catch (error) {
            console.log("MAIN_GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            var instrucciones = '';
            for (let instr of this.instrucciones) {
                if (instr instanceof Error_1.default) {
                    `${instr.imprimir()}`;
                    continue;
                }
                instrucciones += instr.traducir();
            }
            return `\npublic static void main (String [] args){\n${instrucciones}\n}\n`;    
        } catch (error) {
            console.log("MAIN_TRADUCIR_EXC:"+error);    
        }

    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map