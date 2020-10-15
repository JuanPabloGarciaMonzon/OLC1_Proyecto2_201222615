//"use strict";

export class Nodo {
    fila: Number;
    columna: Number;
    tipo: String;
    TipoDato : String; //terminal o no terminal

    /**
     * @abstract Metodo que sirver para ejecutar una instruccion o expresion
     * si fuera instruccion devuelve nulo y si fuera expresion devuelve un valor
     */
 
    /**
     * 
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */
    constructor(type: String, line: Number, column: Number) {
        this.tipo = type;
        this.fila = line;
        this.columna = column;
    }
}