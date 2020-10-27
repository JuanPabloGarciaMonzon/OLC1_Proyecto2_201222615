"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Parametros extends instruccion_1.Instruccion {
    constructor(tipo,identificador,linea, columna) {
        super(linea, columna);
        this.identificador = identificador;
        this.tipo = tipo;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("PARAMETROS");
            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo2(this.identificador.getNodo());
            return nodo;   
        } catch (error) {
            console.log("GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            var lista =[];
            lista.push(this.identificador);
            lista.push(lista);
            return `${this.tipo} ${this.identificador.traducir()}`;  
        } catch (error) {
            console.log("TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Parametros;
//# sourceMappingURL=Parametros.js.map