"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Do_While extends instruccion_1.Instruccion {
    constructor(instrucciones, condicion, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("DOWHILE");
            nodo.agregarHijo("do");
            nodo.agregarHijo("{");
            var cas = new nodoAST_1.default("INSTRUCCIONES");
            for (let m of this.instrucciones) {
                if (m instanceof Error_1.default)
                 continue;
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            nodo.agregarHijo("while");
            nodo.agregarHijo("(");
            nodo.agregarHijo2(this.condicion.getNodo());
            nodo.agregarHijo(")");
            nodo.agregarHijo(";");
            return nodo;     
        } catch (error) {
            console.log("DO_WHILE_GETNODO_EXC:"+error); 
            
        }

    }
    traducir() {
        try {
            var condicion = this.condicion.traducir();
            if (condicion instanceof (Error_1.default))
            return condicion;

            var instrucciones = '';
            for (let instr of this.instrucciones) {
                if (instr instanceof Error_1.default) {
                    `${instr.imprimir()}`;
                    continue;
                }
                instrucciones += instr.traducir();
            }
            return `do {\n${instrucciones}\n}\n while( ${condicion} );\n`;   
        } catch (error) {
            console.log("DO_WHILE_TRADUCIR_EXC:"+error);   
        }

    }
}
exports.default = Do_While;
//# sourceMappingURL=Do_While.js.map