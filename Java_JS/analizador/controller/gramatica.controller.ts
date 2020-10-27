import {Request,Response} from 'express';
import {Instruccion} from '../Jison/Abstract/instruccion';
import nodoAST from '../Jison/Abstract/nodoAST';
import Aritmetica from '../Jison/Expresiones/Aritmetica';
import Identificador from '../Jison/Expresiones/Identificador';
import Logica from '../Jison/Expresiones/Logica';
import Primitivo from '../Jison/Expresiones/Primitivo';
import Relacional from '../Jison/Expresiones/Relacional';
import Asignacion from '../Jison/Instrucciones/Asignacion';
import Break from '../Jison/Instrucciones/Break';
import Call_Function from '../Jison/Instrucciones/Call_Function';
import Clase from '../Jison/Instrucciones/Clase';
//import Comentario from '../Jison/Instrucciones/Comentario';
import Continue from '../Jison/Instrucciones/Continue';
import Declaracion from '../Jison/Instrucciones/Declaracion';
import Do_While from '../Jison/Instrucciones/Do_While';
import For from '../Jison/Instrucciones/For';
import Funcion_Main from '../Jison/Instrucciones/Funcion_Main';
import Funcion from '../Jison/Instrucciones/Funcion';
import If from '../Jison/Instrucciones/If';
import Interface from '../Jison/Instrucciones/Interface';
import Main from '../Jison/Instrucciones/Main';
import Metodo from '../Jison/Instrucciones/Metodo';
import Parametros from '../Jison/Instrucciones/Parametros';
import Print from '../Jison/Instrucciones/Print';
import Return from '../Jison/Instrucciones/Return';
import While from '../Jison/Instrucciones/While';

class gramaticacontroller{

    public ejecutar (req:Request,res:Response){
        var parser = require('../Jison/analizadorJS');
        const entrada = req.body.entrada;
        try {
            let AST = parser.parse(entrada);
            var traduccion = '';
            for(let instruccion of AST)
            {
                traduccion += instruccion.traducir();
            }

            //GENERAR ARBOL
            var fs = require('fs');

            var init = new nodoAST("RAIZ");
            
            var instr = new nodoAST("INSTRUCCIONES");
            for(let instruccion of AST)
            {
                    instr.agregarHijo2(instruccion.getNodo());

            }

            init.agregarHijo2(instr);//AST
            var grafo = '';
            grafo = getDot(init);
            fs.writeFileSync('./ast.dot', grafo);
            fs.writeFileSync('ast.dot', grafo);
            //"dot -T pdf -o ast.pdf ast.dot"

            var exec = require('child_process').exec, child;

            child = exec('dot -T pdf -o ast.pdf ast.dot',
                function (error:any, stdout:any, stderr:any) {
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });

            res.send({
                traduccion : traduccion,
                arbol : grafo
            });
        }
        catch(err){
            console.log(err);
            res.send({
                error : err,
            });
        }
    }

    
    
}   

var dot = ''
var c = 0;

function getDot(raiz:nodoAST)
{
    dot = "";
    dot += "digraph {\n";
    dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0",raiz);
    dot += "}";
    return dot;
}

function recorrerAST(padre:String, nPadre:nodoAST)
{
    for(let hijo of nPadre.getHijos())
    {
        var nombreHijo = "n" + c;
        dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
        dot += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo,hijo);
    }
}

export const gramaticaController = new gramaticacontroller();

