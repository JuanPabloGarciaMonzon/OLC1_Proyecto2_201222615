import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class For extends Instruccion
{
    private condicion:Instruccion;
    private condicion1:Instruccion;
    private condicion2:Instruccion;
    private instrucciones:Array<Instruccion>;

    constructor(condicion:Instruccion,condicion1:Instruccion,condicion2:Instruccion, instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.condicion = condicion;
        this.condicion1 = condicion1;
        this.condicion2 = condicion2;
        this.instrucciones = instrucciones;
    }

    public getNodo() {
        var nodo  = new nodoAST("FOR");
        nodo.agregarHijo("for");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion1.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion2.getNodo());
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
        var condicion = this.condicion.traducir();
        var condicion1 = this.condicion1.traducir();
        var condicion2 = this.condicion2.traducir();
        var instrucciones = '';
        for(let instr of this.instrucciones)
        {
             instrucciones += instr.traducir();
        }
        return `for ( ${condicion};${condicion1};${condicion2} ) {\n${instrucciones}\n}\n`

    }
} 