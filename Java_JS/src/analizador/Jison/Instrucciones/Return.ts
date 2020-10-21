import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Return extends Instruccion
{
    private instrucciones:Array<Instruccion>;

    constructor(instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.instrucciones = instrucciones;
    }

    public getNodo() {
        var nodo  = new nodoAST("RETURN");
        nodo.agregarHijo("return");        
        var cas = new nodoAST("INSTRUCCIONES");
        for(let m of this.instrucciones){
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo(";");
        return nodo;
    }

    public traducir():any
    {
        var instrucciones = '';
        for(let instr of this.instrucciones)
        {
             instrucciones += instr.traducir();
        }
        return `return ${instrucciones};\n`

    }
} 