"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Funcion extends instruccion_1.Instruccion {
    constructor(tipo, identificador, parametros, instrucciones, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("FUNCION");
            nodo.agregarHijo("public");
            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo(this.identificador);
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
            console.log("FUNCION_GETNODO_EXC:"+error); 
        }

    }
    traducir() {
        try {
            var instrucciones = '';
            var parametros = '';
            var pam = '';
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
                parametros += par.traducir() + ",";        
            }
            pam = parametros.substring(0,parametros.length-1);
            return `\nfunction ${this.identificador} (${pam})\n {\n${instrucciones}\n}\n`;   
        } catch (error) {
            console.log("FUNCION_TRADUCIR_EXC:"+error);  
        }

    }
}
exports.default = Funcion;
//# sourceMappingURL=Funcion.js.map