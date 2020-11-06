"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    setSalida(salida) {
        try {
            this.salida = salida;    
        } catch (error) {
        console.log("SETSALIDA:"+error);    
        }

    }
    getSalida() {
        try {
            return this.salida;  
        } catch (error) {
            console.log("GETSALIDA:"+error);   
        }

    }
}
exports.Instruccion = Instruccion;
//# sourceMappingURL=instruccion.js.map