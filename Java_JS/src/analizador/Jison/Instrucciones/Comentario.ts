import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Comentario extends Instruccion
{
    private comentario:String;


    constructor(comentario:String,linea:Number, columna:Number){
        super(linea,columna);
        this.comentario = comentario;
    }

    public getNodo() {
        var nodo  = new nodoAST("COMENTARIO");
        nodo.agregarHijo(this.comentario);
        return nodo;
    }

    public traducir():any
    {
        return `${this.comentario}\n`;
    }
}