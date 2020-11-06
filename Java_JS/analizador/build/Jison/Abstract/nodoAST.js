"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoAST {
    constructor(valor) {
        this.hijos = new Array();
        this.error = new Array();
        this.valor = valor;
    }
    setHijos(hijos) {
        try {
            this.hijos = hijos;   
        } catch (error) {
          console.log("SETHIJOS:"+error);  
        }

    }
    agregarHijo(cad) {
        try {
            this.hijos.push(new nodoAST(cad));  
        } catch (error) {
            console.log("AGREGARHIJO:"+error);  
        }

    }
    excepcion() {
        console.log("EXCEPCION")
    }
    agregarHijos(hijos) {
        try {
            for (let hijo of hijos) {
                this.hijos.push(hijo);
            }   
        } catch (error) {
            console.log("AGREGARHIJOS:"+error);    
        }

    }
    agregarHijo2(hijo) {
        try {
            this.hijos.push(hijo);   
        } catch (error) {
            console.log("AGREGARHIJO2:"+error); 
        }

    }

    agregarPrimerHijo(cad) {
        try {
            this.hijos.unshift(new nodoAST(cad));   
        } catch (error) {
            console.log("AGREGARPRIMERHIJO:"+error);  
        }

    }
    agregarPrimerHijo2(hijo) {
        try {
            this.hijos.unshift(hijo);   
        } catch (error) {

          console.log("AGREGARPRIMERHIJO2:"+error);   
        }

    }
    getValor() {
        try {
            return this.valor;   
        } catch (error) {
            console.log("GETVALOR:"+error);      
        }

    }
    setValor(cad) {
        try {
            this.valor = cad;    
        } catch (error) {
            console.log("SETVALOR:"+error);  
        }

    }
    getHijos() {
        try {
            return this.hijos;   
        } catch (error) {
            console.log("GETHIJOS:"+error);    
        }

    }


}
exports.default = nodoAST;
//# sourceMappingURL=nodoAST.js.map