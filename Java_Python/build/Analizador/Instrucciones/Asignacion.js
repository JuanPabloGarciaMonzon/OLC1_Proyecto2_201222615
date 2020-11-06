"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Asignacion extends instruccion_1.Instruccion {
    constructor(identificador, expresion, linea, columna) {
        super(linea, columna);
        console.log("ENTRO A ASIGACION");
        this.identificador = identificador;
        this.expresion = expresion;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("ASIGNACION");
            nodo.agregarHijo(this.identificador);
            nodo.agregarHijo2(this.expresion.getNodo());
            return nodo; 
        } catch (error) {
            console.log("GETNODO_EXC:"+error);
            
        }

    }
    traducir() {
        try {
            var value = this.expresion.traducir();
            return `${this.identificador} = ${value};`;  
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error);
            
        }
        
    }
}
exports.default = Asignacion;
//# sourceMappingURL=Asignacion.js.map