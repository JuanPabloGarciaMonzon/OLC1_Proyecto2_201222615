"use strict";
exports.__esModule = true;
exports.gramaticaController = void 0;
var nodoAST_1 = require("../Jison/Abstract/nodoAST");
var gramaticacontroller = /** @class */ (function () {
    function gramaticacontroller() {
    }
    gramaticacontroller.prototype.ejecutar = function (req, res) {
        var parser = require('../Jison/analizadorJS');
        var entrada = req.body.entrada;
        try {
            var AST = parser.parse(entrada);
            var traduccion = '';
            for (var _i = 0, AST_1 = AST; _i < AST_1.length; _i++) {
                var instruccion = AST_1[_i];
                traduccion += instruccion.traducir();
            }
            //GENERAR ARBOL
            var fs = require('fs');
            var init = new nodoAST_1["default"]("RAIZ");
            var instr = new nodoAST_1["default"]("INSTRUCCIONES");
            for (var _a = 0, AST_2 = AST; _a < AST_2.length; _a++) {
                var instruccion = AST_2[_a];
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
                arbol: grafo
            });
        }
        catch (err) {
            console.log(err);
            res.send({
                error: err
            });
        }
    };
    return gramaticacontroller;
}());
var dot = '';
var c = 0;
function getDot(raiz) {
    dot = "";
    dot += "digraph {\n";
    dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0", raiz);
    dot += "}";
    return dot;
}
function recorrerAST(padre, nPadre) {
    for (var _i = 0, _a = nPadre.getHijos(); _i < _a.length; _i++) {
        var hijo = _a[_i];
        var nombreHijo = "n" + c;
        dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
        dot += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    }
}
exports.gramaticaController = new gramaticacontroller();
