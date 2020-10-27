import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Parentesis extends Instruccion
{
    private parA:String;
    private parC:String;
    private operando1:Instruccion;

    constructor(parA:String,operando1:Instruccion,parC:String,fila:Number, columna:Number)
    {
        super(fila,columna);
        this.parA = parA;
        this.operando1 = operando1;        
        this.parC = parC;

    }

    public getNodo() {
        var nodo  = new nodoAST("EXPRESION");
        nodo.agregarHijo2(this.operando1.getNodo());
        return nodo;
    }

    public traducir():any
    {
        return this.parA + this.operando1.traducir() + this.parC + "";
        
    }
}
