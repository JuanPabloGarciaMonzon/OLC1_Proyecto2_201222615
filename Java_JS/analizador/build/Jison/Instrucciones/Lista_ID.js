"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("./Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Lista_ID extends instruccion_1.Instruccion {
    constructor(tipo,identificador,linea, columna) {
        super(linea, columna);
        console.log("ENTRO A LISTA DE IDS");
        this.identificador = identificador;
        this.tipo = tipo;
        
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("ASIGNACION");
            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo2(this.identificador.getNodo());
            return nodo;   
        } catch (error) {
            console.log("LID_GETNODO_EXC:"+error);  
        }

    }
    traducir() {
        try {
            var identificador = this.identificador.traducir();
            if (identificador instanceof (Error_1.default))
            return identificador;

            return `${this.tipo} = ${identificador}`;  
        } catch (error) {
            console.log("LID_TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Lista_ID;
//# sourceMappingURL=Parametros.js.map