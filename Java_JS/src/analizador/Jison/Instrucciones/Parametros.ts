import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Parametros extends Instruccion
{
    private tipo:String;
    private identificador:String;


    constructor(identificador:String,tipo:String, linea:Number, columna:Number){
        super(linea,columna);
        this.identificador = identificador;
        this.tipo =tipo;
    }

    public getNodo() {
        var nodo  = new nodoAST("PARAMETROS");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.identificador);
        return nodo;
    }

    public traducir():any
    {
        return `${this.tipo} ${this.identificador} ;\n`;
    }
}