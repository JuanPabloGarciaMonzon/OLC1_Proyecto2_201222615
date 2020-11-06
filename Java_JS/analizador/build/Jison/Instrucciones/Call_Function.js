"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Call_Function extends instruccion_1.Instruccion {
    constructor(tipo, identificador, parametros, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.parametros = parametros;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("CALL");
            if(this.tipo == ""){
                nodo.agregarHijo(this.identificador);
                nodo.agregarHijo("(");
                var par = new nodoAST_1.default("VALORES");
                for (let m of this.parametros) {
                    if (m instanceof Error_1.default)
                     continue;
                    par.agregarHijo2(m.getNodo());
                }
                nodo.agregarHijo2(par);
                nodo.agregarHijo(")");
                nodo.agregarHijo(";");
                return nodo; 
            }
            else if (this.tipo == "EXPRESION"){
                nodo.agregarHijo(this.identificador);
                nodo.agregarHijo("(");
                var par = new nodoAST_1.default("VALORES");
                for (let m of this.parametros) {
                    if (m instanceof Error_1.default)
                     continue;
                    par.agregarHijo2(m.getNodo());
                }
                nodo.agregarHijo2(par);
                nodo.agregarHijo(")");
                return nodo; 
            }
            else{
                nodo.agregarHijo("public");
                nodo.agregarHijo(this.tipo);
                nodo.agregarHijo(this.identificador);
                nodo.agregarHijo("(");
                var par = new nodoAST_1.default("VALORES");
                for (let m of this.parametros) {
                    if (m instanceof Error_1.default)
                     continue;
                    par.agregarHijo2(m.getNodo());
                }
                nodo.agregarHijo2(par);
                nodo.agregarHijo(")");
                nodo.agregarHijo(";");
                return nodo; 
            }
  
        } catch (error) {
            console.log("CALL_FUNCTION_GETNODO_EXC:"+error);  
            
        }

    }
    traducir() {
        try {
            var parametros = '';
            var pam = '';


            for (let par of this.parametros) {
                if (par instanceof Error_1.default) {
                    `${par.imprimir()}`;
                    continue;
                }
                parametros += par.traducir()+ ",";
            }
            pam = parametros.substring(0,parametros.length-1);
            if(this.tipo == ""){
                return `${this.identificador} (${pam});\n`;  
            }
            else if (this.tipo == "EXPRESION"){
                return `${this.identificador} (${pam})`;   
            }
            else{
                return `\nfunction ${this.identificador} (${pam});\n`;  
            }

        } catch (error) {
            console.log("CALL_FUNCTION_TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Call_Function;
//# sourceMappingURL=Call_Function.js.map