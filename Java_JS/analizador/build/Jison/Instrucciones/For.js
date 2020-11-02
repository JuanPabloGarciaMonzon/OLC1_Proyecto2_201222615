"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class For extends instruccion_1.Instruccion {
    constructor(condicion, condicion1, condicion2, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.condicion1 = condicion1;
        this.condicion2 = condicion2;
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("FOR");
            nodo.agregarHijo("for");
            nodo.agregarHijo("(");
            nodo.agregarHijo2(this.condicion.getNodo());
            nodo.agregarHijo(";");
            nodo.agregarHijo2(this.condicion1.getNodo());
            nodo.agregarHijo(";");
            nodo.agregarHijo2(this.condicion2.getNodo());
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
            var condicion = this.condicion.traducir();
            var condicion1 = this.condicion1.traducir();
            var condicion2 = this.condicion2.traducir();
            var instrucciones = '';
            for (let instr of this.instrucciones) {
                instrucciones += instr.traducir();
            }
            return `\nfor ( ${condicion}${condicion1};${condicion2} ) {\n${instrucciones}\n}\n`;   
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = For;
//# sourceMappingURL=For.js.map