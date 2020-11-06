"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Lista_Par extends instruccion_1.Instruccion {
        constructor(operando1, coma, fila, columna) {
            super(fila,columna);
            this.operando1 = operando1;
            //console.log("PARAMETROS\n"+operando1);        
            this.coma = coma;
            try {
                var parametro = '';

                for (let par of this.operando1) {
                    parametro += par;
                }    
            } catch (error) {
                console.log("LISTA_PAR:"+error);  
                
            }

        }


    }
    exports.default = Lista_Par;
    //# sourceMappingURL=Relacional.js.map
