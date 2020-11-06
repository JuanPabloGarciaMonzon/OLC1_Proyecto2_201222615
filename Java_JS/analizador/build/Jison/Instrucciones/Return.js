"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = __importDefault(require("./Error"));
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Return extends instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("RETURN");
            nodo.agregarHijo("return");
            nodo.agregarHijo2(this.instrucciones.getNodo());
            nodo.agregarHijo(";");
            return nodo;  
        } catch (error) {
            console.log("RETURN_GETNODO_EXC:"+error); 
        }

    }
    traducir() {
        try {
            var instrucciones = this.instrucciones.traducir();
            if (instrucciones instanceof (Error_1.default))
            return instrucciones;

            return `\nreturn ${instrucciones};\n`;  
        } catch (error) {
            console.log("RETURN_TRADUCIR_EXC:"+error);  
        }

        
    }
}
exports.default = Return;
//# sourceMappingURL=Return.js.map