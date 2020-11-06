"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Error_1 = __importDefault(require("./Error"));
class Print extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("PRINT");
            nodo.agregarHijo2(this.expresion.getNodo());
            return nodo;    
        } catch (error) {
            console.log("PRINT_GETNODO_EXC:"+error);   
        }

    }
    traducir() {
        try {
            var value = this.expresion.traducir();
            if (value instanceof (Error_1.default))
            return value;

            return `\nconsole.log( ${value} );\n`;  
        } catch (error) {
            console.log("PRINT_TRADUCIR_EXC:"+error); 
        }

    }
}
exports.default = Print;
//# sourceMappingURL=Print.js.map