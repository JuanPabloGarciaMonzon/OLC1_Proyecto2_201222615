  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Main extends Instruccion
{
    private instrucciones:Array<Instruccion>;


    constructor(instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.instrucciones = instrucciones;
    }

    public getNodo() {
        var nodo  = new nodoAST("MAIN");
        nodo.agregarHijo("public");
        nodo.agregarHijo("static");
        nodo.agregarHijo("void");
        nodo.agregarHijo("main");
        


        nodo.agregarHijo("(");
        nodo.agregarHijo("String");
        nodo.agregarHijo("[");
        nodo.agregarHijo("]");
        nodo.agregarHijo("args");
        nodo.agregarHijo(")");

        nodo.agregarHijo("{");
        var cas = new nodoAST("INSTRUCCIONES");
        for(let m of this.instrucciones){
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    }

    public traducir():any
    {
        var instrucciones = '';
        for(let instr of this.instrucciones)
        {
             instrucciones += instr.traducir();
        }
        return `public static void main (String [] args){\n${instrucciones}\n}\n`

    }
}
