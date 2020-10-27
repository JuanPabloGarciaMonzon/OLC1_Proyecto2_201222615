  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Metodo extends Instruccion
{
    private identificador:String;
    private instrucciones:Array<Instruccion>;
    private parametros:Array<Instruccion>;


    constructor(identificador:String, parametros:Array<Instruccion> , 
        instrucciones:Array<Instruccion>, linea:Number, columna:Number)
        {
        super(linea,columna);
        this.identificador = identificador;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
        }

    public getNodo() 
    {
        var nodo  = new nodoAST("METODO");
        nodo.agregarHijo("public");
        nodo.agregarHijo("void");
        nodo.agregarHijo(this.identificador);

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
        return `public void ${this.identificador} (${parametros})\n {\n${instrucciones}\n}\n`

    }
}
