"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gramaticaController = void 0;
const nodoAST_1 = __importDefault(require("../Analizador/Abstract/nodoAST"));
class gramaticacontroller {
    ejecutar(req, res) {
        var parser = require('../Analizador/analizadorJS');
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
          errorReport(error);
          tokenReport(token);    
        }
        catch (err) {
            console.log(err);
            res.send({
                error: err,
            });
        }
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
            if (hijo.getValor()=="EXCEPCION"){
                console.log("ESTO ES UNA EXCEPCION")
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


function errorReport(lista_error) {
    // Abrir nuevo tab

    var verrores="";
    var error_report = "";
    for(let er of lista_error){
        verrores+= "<tr>\n" +
            "<td>"+ er[0]+"</td>\n" +
            "<td>"+ er[4]+"</td>\n" +
            "<td>"+ er[2]+"</td>\n" +
            "<td>"+ er[3]+"</td>\n" +
            "<td>"+ "El caracter"+ " " + er[1]+ " " + "no pertenece al lenguaje"+"</td>\n" +
            "</tr>\n";
    }
    var fs = require('fs');
    // Cambiar el foco al nuevo tab (punto opcional)
    error_report = "<style>\n" +
        "table {\n" +
        "font-family: arial, sans-serif;\n" +
        "border: 1px solid #dddddd;\n" +
        "width: 100%;\n" +
        "}\n" +
        "td, th {\n" +
        "border: 1px solid #dddddd;\n" +
        "text-align: left;\n" +
        "padding: 8px;\n" +
        "}\n" +
        "th{\n" +
        "background-color:#2196F3;\n" +
        "color: white;\n" +
        "}\n" +
        "</style>" +
        "<h2>TABLA DE ERRORES</h2>\n" +
        "<table>\n" +
        "<tr>\n" +
        "<th>NO.</th>\n" +
        "<th>TIPO</th>\n" +        
        "<th>FILA</th>\n" +
        "<th>COLUMNA</th>\n" +
        "<th>DESCRIPCION</th>\n" +
        "</tr>\n" +
        verrores +
        "</table>";


        fs.writeFileSync('./error.html', error_report);
}


function tokenReport(lista_token) {
    var vartoken="";
    var token_report = "";
    for(let tk of lista_token){
        vartoken+= "<tr>\n" +
            "<td>"+ tk[0]+"</td>\n" +
            "<td>"+ tk[1]+"</td>\n" +
            "<td>"+ tk[2]+"</td>\n" +
            "<td>"+ tk[3]+"</td>\n" +
            "<td>"+ tk[4]+"</td>\n" +
            "</tr>\n";
    }
    var fs = require('fs');
    // Cambiar el foco al nuevo tab (punto opcional)
    token_report = "<style>\n" +
        "table {\n" +
        "font-family: arial, sans-serif;\n" +
        "border: 1px solid #dddddd;\n" +
        "width: 100%;\n" +
        "}\n" +
        "td, th {\n" +
        "border: 1px solid #dddddd;\n" +
        "text-align: left;\n" +
        "padding: 8px;\n" +
        "}\n" +
        "th{\n" +
        "background-color:#2196F3;\n" +
        "color: white;\n" +
        "}\n" +
        "</style>" +
        "<h2>TABLA DE TOKENS</h2>\n" +
        "<table>\n" +
        "<tr>\n" +
        "<th>NO.</th>\n" +        
        "<th>FILA</th>\n" +
        "<th>COLUMNA</th>\n" +
        "<th>TIPO</th>\n" +
        "<th>DESCRIPCION</th>\n" +
        "</tr>\n" +
        vartoken +
        "</table>";


        fs.writeFileSync('./token.html', token_report);

}




exports.gramaticaController = new gramaticacontroller();
//# sourceMappingURL=gramatica.controller.js.map