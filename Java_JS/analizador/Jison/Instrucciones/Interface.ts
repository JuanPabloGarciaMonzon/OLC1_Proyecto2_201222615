  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Interface extends Instruccion
{
    private identificador:String;
    private instrucciones:Array<Instruccion>;


    constructor(identificador:String, instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.identificador = identificador;
        this.instrucciones = instrucciones;
    }

    public getNodo() {
        var nodo  = new nodoAST("INTERFACE");
        nodo.agregarHijo("public");
        nodo.agregarHijo("interface");
        nodo.agregarHijo(this.identificador);
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
        return `public interface ${this.identificador} {\n${instrucciones}\n}\n`

    }
}
