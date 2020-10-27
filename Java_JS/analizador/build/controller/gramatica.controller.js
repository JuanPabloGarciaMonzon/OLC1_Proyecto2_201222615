"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gramaticaController = void 0;
const nodoAST_1 = __importDefault(require("../Jison/Abstract/nodoAST"));
class gramaticacontroller {
    ejecutar(req, res) {
        var parser = require('../Jison/analizadorJS');
        const entrada = req.body.entrada;
        try {
            let TEMP = parser.parse(entrada);
            let AST= TEMP.ast;
            console.log(TEMP.tabla_errores);
            var error = TEMP.tabla_errores;
            console.log(TEMP.tabla_tokens);
            var token = TEMP.tabla_tokens;
            var traduccion = '';

            // console.log(error);
            for (let instruccion of AST) {
                traduccion += instruccion.traducir();
            }
            //GENERAR ARBOL
            var fs = require('fs');
            var init = new nodoAST_1.default("RAIZ");
            var instr = new nodoAST_1.default("INSTRUCCIONES");
            for (let instruccion of AST) {
                instr.agregarHijo2(instruccion.getNodo());
            }
            init.agregarHijo2(instr); //AST
            var grafo = '';
            grafo = getDot(init);
            fs.writeFileSync('./ast.dot', grafo);
            fs.writeFileSync('ast.dot', grafo);
            //"dot -T pdf -o ast.pdf ast.dot"
            var exec = require('child_process').exec, child;
            child = exec('dot -T pdf -o ast.pdf ast.dot', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
            res.send({
                traduccion: traduccion,
                arbol: grafo,
                error:error,
                token:token

            });
            
        }
        catch (err) {
            console.log(err);
            res.send({
                error: err,
            });
        }
    }

    getError(Error) {
        console.log(Error);
    }
}
var dot = '';
var c = 0;
function getDot(raiz) {
        console.log(raiz.getValor());
        dot = "";
        dot += "digraph {\n";
        dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
        c = 1;
        recorrerAST("n0", raiz);
        dot += "}";
        return dot;
    

}
function recorrerAST(padre, nPadre) {

    try {
        for (let hijo of nPadre.getHijos()) {
            if (hijo.getValor()=="COMENTARIO"){
                console.log("ESTO ES UN COMENTARIO")
            }
            else{
                var nombreHijo = "n" + c;
                dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
                dot += padre + "->" + nombreHijo + ";\n";
                c++;
                recorrerAST(nombreHijo, hijo);
            }
    
        } 
    } catch (error) {
        console.log("RECORRER_AST:"+error);
        
    }

}




exports.gramaticaController = new gramaticacontroller();
//# sourceMappingURL=gramatica.controller.js.map