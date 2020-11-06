"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class EmptyF extends instruccion_1.Instruccion {
    constructor(tipo,identificador, parametros, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.parametros = parametros;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("FUNCION");
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
            var par = new nodoAST_1.default("EXCEPCION");
            nodo.excepcion();          
            nodo.agregarHijo("INSTRUCCIONES")
            nodo.agregarHijo("}");
            return nodo;     
        } catch (error) {
            console.log("EMPYTF_GETNODO_EXC:"+error);
        }

    }
    traducir() {
        try {
            var parametro = '';
            var pam = '';
        
    
            for (let par of this.parametros) {
                if (par instanceof Error_1.default) {
                    `${par.imprimir()}`;
                    continue;
                }
                parametro += par.traducir()+ ",";
            }
            pam = parametro.substring(0,parametro.length-1);
            return `function ${this.identificador} (${pam})\n {\n}\n`;   
        } catch (error) {
            console.log("EMPYTF_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = EmptyF;
//# sourceMappingURL=Metodo.js.map