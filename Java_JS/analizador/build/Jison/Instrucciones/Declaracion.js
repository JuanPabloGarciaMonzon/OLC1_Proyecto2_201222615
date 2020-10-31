"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, identificador, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        console.log("ENTRO A DECLARACION");
        this.identificador = identificador;
    }
    getNodo() {

        try {
            var nodo = new nodoAST_1.default("DECLARACION");
            nodo.agregarHijo(this.tipo);
            var list = new nodoAST_1.default("IDS");
        for (let m of this.identificador) {
            list.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(list);
        return nodo;  
        } catch (error) {
            console.log("GETNODO_EXC:"+error);
        }

    }
    traducir() {

        try {
            var lista = '';
            var pam = "";
            for (let lst of this.identificador) {
                lista += lst.traducir()+",";
            }
            pam = lista.substring(0,lista.length-1);
            return `${this.tipo} ${pam};`;
            
        } catch (error) {

            console.log("TRADUCIR_EXC:"+error);
            
        }

    }
}
exports.default = Declaracion;
//# sourceMappingURL=Declaracion.js.map