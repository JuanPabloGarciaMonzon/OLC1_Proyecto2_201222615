import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Continue extends Instruccion
{

    constructor(linea:Number, columna:Number){
        super(linea,columna);
    }

    public getNodo() {
        var nodo  = new nodoAST("CONTINUE");
        nodo.agregarHijo("continue");
        nodo.agregarHijo(";");
        return nodo;
    }

    public traducir():any
    {
        return `continue;\n`

    }
} 