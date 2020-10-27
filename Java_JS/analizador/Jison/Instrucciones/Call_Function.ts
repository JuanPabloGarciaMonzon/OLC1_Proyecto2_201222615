  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Call_Function extends Instruccion
{
    private tipo:String;
    private identificador:String;
    private parametros:Array<Instruccion>;


    constructor(tipo:String,identificador:String, parametros:Array<Instruccion> 
        ,linea:Number, columna:Number){
        super(linea,columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.parametros = parametros;
    }

    public getNodo() {
        var nodo  = new nodoAST("CALL");
        nodo.agregarHijo("public");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.identificador);

        nodo.agregarHijo("(");
        var par = new nodoAST("PARAMETROS");
        for(let m of this.parametros){
            par.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(par);
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }

    public traducir()
    {
        var parametros = '';

        for(let par of this.parametros)
        {
            parametros += par.traducir();
        }
        return `public ${this.tipo} ${this.identificador} (${parametros});\n`

    }
}
