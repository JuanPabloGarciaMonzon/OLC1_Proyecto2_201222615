"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Metodo extends instruccion_1.Instruccion {
    constructor(identificador, parametros, instrucciones, linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
        console.log("INSTRUCCIONES METODO:"+this.instrucciones);
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("METODO");
            nodo.agregarHijo("public");
            nodo.agregarHijo("void");
            nodo.agregarHijo(this.identificador);
            nodo.agregarHijo("(");
            var par = new nodoAST_1.default("PARAMETRO");
            for (let m of this.parametros) {
                if (m instanceof Error_1.default)
                 continue;
                par.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(par);
    
            nodo.agregarHijo(")");
            nodo.agregarHijo("{");
            var el = new nodoAST_1.default("INSTRUCCIONES");
            for (let m of this.instrucciones) {
                if (m instanceof Error_1.default)
                 continue;
                el.agregarHijo2(m.getNodo());
            }
            
            nodo.agregarHijo2(el);
            nodo.agregarHijo("}");
            return nodo;     
        } catch (error) {
            console.log("METODO_GETNODO_EXC:"+error);
        }

    }
    traducir() {
        try {
            var instrucc = '';
            var parametro = '';
            var pam = '';
            
            for (let instr of this.instrucciones) {
                if (instr instanceof Error_1.default) {
                    `${instr.imprimir()}`;
                    continue;
                }
                instrucc += instr.traducir();
            }
    
            for (let par of this.parametros) {
                if (par instanceof Error_1.default) {
                    `${par.imprimir()}`;
                    continue;
                }
                parametro += par.traducir()+ ",";
            }
            pam = parametro.substring(0,parametro.length-1);
            return `\nfunction ${this.identificador} (${pam})\n {\n${instrucc}\n}\n`;   
        } catch (error) {
            console.log("METODO_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = Metodo;
//# sourceMappingURL=Metodo.js.map