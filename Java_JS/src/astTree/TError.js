/* Clase nodo de error*/

export class TError{

    tipo : String;
    lexema : String;
    descripcion: String;
    fila: Number;
    columna: Number;

    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param type Tipo de error, e.g. (lexico, sintactico)
     * @param description Descripcion del error, e.g. (No se encontro la variable X)
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */
    constructor(type: String, description: String, line: Number, column: Number) {
        this.tipo = type;
        this.descripcion = description;
        this.fila = line;
        this.columna = column;
    }

    toString(){
        return `${this.tipo} ${this.descripcion} ${this.fila} ${this.columna}`;
    }
}