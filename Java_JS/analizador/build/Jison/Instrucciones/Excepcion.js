"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Excepcion extends instruccion_1.Instruccion {
    constructor(tipo,linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("EXCEPCION");
            nodo.excepcion();
            return nodo;   
        } catch (error) {
            console.log("EXCEPCION_GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            return "";  
        } catch (error) {
            console.log("EXCEPCION_TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Excepcion;
//# sourceMappingURL=Parametros.js.map