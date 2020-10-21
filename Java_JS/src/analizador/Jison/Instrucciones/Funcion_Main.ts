  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Funcion_Main extends Instruccion
{
    private tipo:String;
    private identificador:String;
    private instrucciones:Array<Instruccion>;
    private parametros:Array<Instruccion>;


    constructor(parametros:Array<Instruccion> , instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }

    public getNodo() {
        var nodo  = new nodoAST("FUNCION_MAIN");
        nodo.agregarHijo("public");
        nodo.agregarHijo("static")
        nodo.agregarHijo("void")
        nodo.agregarHijo("main")

        nodo.agregarHijo("(");
        var par = new nodoAST("PARAMETROS");
        for(let m of this.parametros){
            par.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(par);
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
        var parametros = '';
        for(let instr of this.instrucciones)
        {
             instrucciones += instr.traducir();
        }

        for(let par of this.parametros)
        {
            parametros += par.traducir();
        }
        return `public static void main (${parametros})\n {\n${instrucciones}\n}\n`

    }
}
