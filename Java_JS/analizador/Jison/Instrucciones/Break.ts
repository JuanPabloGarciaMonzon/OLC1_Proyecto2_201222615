import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Break extends Instruccion
{

    constructor(linea:Number, columna:Number){
        super(linea,columna);
    }

    public getNodo() {
        var nodo  = new nodoAST("BREAK");
        nodo.agregarHijo("break");
        nodo.agregarHijo(";");
        return nodo;
    }

    public traducir():any
    {
        return `break;\n`

    }
} 