"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Error_1 = __importDefault(require("../Instrucciones/Error"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Aritmetica extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(fila, columna);
        this.operador = operador;
        if (!operando2) {
            this.operandoU = operando1;
        }
        else {
            this.operando1 = operando1;
            this.operando2 = operando2;
        }
    }
    getNodo() {

        try {
            var nodo = new nodoAST_1.default("ARITMETICA");
            if (this.operandoU != null) {
                nodo.agregarHijo(this.operador + "");
                nodo.agregarHijo2(this.operandoU.getNodo());
            }
            else {
                if (this.operando1 != undefined && this.operando2 != undefined) {
                    nodo.agregarHijo2(this.operando1.getNodo());
                    nodo.agregarHijo(this.operador + "");
                    nodo.agregarHijo2(this.operando2.getNodo());
                }
            }
            return nodo;
        } catch (error) {
            console.log("ARITMETICA_GETNODO_ERROR:"+error)
            
        }

    }
    traducir() {

        try {
            var op1 = this.operando1.traducir();
            if (op1 instanceof (Error_1.default))
            return op1;
            var op2 = this.operando2.traducir();
            if (op2 instanceof (Error_1.default))
            return op2;

            if (this.operandoU != null) {
                var opU = this.operandoU.traducir();
                if (opU instanceof (Error_1.default))
                return opU;

                if(this.operador=="++"||this.operador=="--"){
                    var opU = this.operandoU.traducir();
                    if (opU instanceof (Error_1.default))
                    return opU;

                    return `${opU} ${this.operador}`;
                }
                else{
                    var opU = this.operandoU.traducir();
                    if (opU instanceof (Error_1.default))
                    return opU;

                    return `${this.operador} ${opU}`;
                }
                
            }
            else {
                if (this.operando1 != undefined && this.operando2 != undefined) {
                    return `${op1} ${this.operador} ${op2}`;
                }
            }   
        } catch (error) {
            console.log("ARITMETICA_TRADUCIR_ERROR:"+error)
        }

    }
}
exports.default = Aritmetica;
//# sourceMappingURL=Aritmetica.js.map