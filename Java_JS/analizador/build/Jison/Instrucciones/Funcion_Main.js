"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Funcion_Main extends instruccion_1.Instruccion {
    constructor(parametros, instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("MAIN");
            nodo.agregarHijo("public");
            nodo.agregarHijo("static");
            nodo.agregarHijo("void");
            nodo.agregarHijo("main");
            nodo.agregarHijo("(");
            var par = new nodoAST_1.default("PARAMETROS");
            for (let m of this.parametros) {
                if (m instanceof Error_1.default)
                continue;
                par.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(par);
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
            console.log("FUNCION_MAIN_GETNODO_EXC:"+error);   
        }

    }
    traducir() {
        try {
            var instrucciones = '';
            var parametros = '';
            for (let instr of this.instrucciones) {
                if (instr instanceof Error_1.default) {
                    `${instr.imprimir()}`;
                    continue;
                }
                instrucciones += instr.traducir();
            }
            for (let par of this.parametros) {
                if (par instanceof Error_1.default) {
                    `${par.imprimir()}`;
                    continue;
                }
                parametros += par.traducir();
            }
            return `\npublic static void main (${parametros})\n {\n${instrucciones}\n}\n`;     
        } catch (error) {
            console.log("FUNCION_MAIN_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = Funcion_Main;
//# sourceMappingURL=Funcion_Main.js.map