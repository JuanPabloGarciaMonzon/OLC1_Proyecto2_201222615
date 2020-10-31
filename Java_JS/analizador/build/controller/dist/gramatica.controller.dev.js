"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gramaticaController = void 0;

var nodoAST_1 = __importDefault(require("../Jison/Abstract/nodoAST"));

var gramaticacontroller =
/*#__PURE__*/
function () {
  function gramaticacontroller() {
    _classCallCheck(this, gramaticacontroller);
  }

  _createClass(gramaticacontroller, [{
    key: "ejecutar",
    value: function ejecutar(req, res) {
      var parser = require('../Jison/analizadorJS');

      var entrada = req.body.entrada;

      try {
        var TEMP = parser.parse(entrada);
        var AST = TEMP.ast;
        console.log(TEMP.tabla_errores);
        var error = TEMP.tabla_errores;
        console.log(TEMP.tabla_tokens);
        var token = TEMP.tabla_tokens;
        var traduccion = ''; // console.log(error);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = AST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var instruccion = _step.value;
            traduccion += instruccion.traducir();
          } //GENERAR ARBOL

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var fs = require('fs');

        var init = new nodoAST_1["default"]("RAIZ");
        var instr = new nodoAST_1["default"]("INSTRUCCIONES");
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = AST[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _instruccion = _step2.value;
            instr.agregarHijo2(_instruccion.getNodo());
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        init.agregarHijo2(instr); //AST

        var grafo = '';
        grafo = getDot(init);
        fs.writeFileSync('./ast.dot', grafo);
        fs.writeFileSync('ast.dot', grafo); //"dot -T pdf -o ast.pdf ast.dot"

        var exec = require('child_process').exec,
            child;

        child = exec('dot -T pdf -o ast.pdf ast.dot', function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });
        res.send({
          traduccion: traduccion,
          arbol: grafo,
          error: error,
          token: token
        });
        errorReport(error);
        tokenReport(token);
      } catch (err) {
        console.log(err);
        res.send({
          error: err
        });
      }
    }
  }]);

  return gramaticacontroller;
}();

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
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = nPadre.getHijos()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var hijo = _step3.value;

        if (hijo.getValor() == "EXCEPCION") {
          console.log("ESTO ES UNA EXCEPCION");
        } else {
          var nombreHijo = "n" + c;
          dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
          dot += padre + "->" + nombreHijo + ";\n";
          c++;
          recorrerAST(nombreHijo, hijo);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  } catch (error) {
    console.log("RECORRER_AST:" + error);
  }
}

function errorReport(lista_error) {
  // Abrir nuevo tab
  var verrores = "";
  var error_report = "";
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = lista_error[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var er = _step4.value;
      verrores += "<tr>\n" + "<td>" + er[0] + "</td>\n" + "<td>" + er[4] + "</td>\n" + "<td>" + er[2] + "</td>\n" + "<td>" + er[3] + "</td>\n" + "<td>" + "El caracter" + " " + er[1] + " " + "no pertenece al lenguaje" + "</td>\n" + "</tr>\n";
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var fs = require('fs'); // Cambiar el foco al nuevo tab (punto opcional)


  error_report = "<style>\n" + "table {\n" + "font-family: arial, sans-serif;\n" + "border: 1px solid #dddddd;\n" + "width: 100%;\n" + "}\n" + "td, th {\n" + "border: 1px solid #dddddd;\n" + "text-align: left;\n" + "padding: 8px;\n" + "}\n" + "th{\n" + "background-color:#2196F3;\n" + "color: white;\n" + "}\n" + "</style>" + "<h2>TABLA DE ERRORES</h2>\n" + "<table>\n" + "<tr>\n" + "<th>NO.</th>\n" + "<th>TIPO</th>\n" + "<th>FILA</th>\n" + "<th>COLUMNA</th>\n" + "<th>DESCRIPCION</th>\n" + "</tr>\n" + verrores + "</table>";
  fs.writeFileSync('./error.html', error_report);
}

function tokenReport(lista_token) {
  var vartoken = "";
  var token_report = "";
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = lista_token[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var tk = _step5.value;
      vartoken += "<tr>\n" + "<td>" + tk[0] + "</td>\n" + "<td>" + tk[1] + "</td>\n" + "<td>" + tk[2] + "</td>\n" + "<td>" + tk[3] + "</td>\n" + "<td>" + tk[4] + "</td>\n" + "</tr>\n";
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  var fs = require('fs'); // Cambiar el foco al nuevo tab (punto opcional)


  token_report = "<style>\n" + "table {\n" + "font-family: arial, sans-serif;\n" + "border: 1px solid #dddddd;\n" + "width: 100%;\n" + "}\n" + "td, th {\n" + "border: 1px solid #dddddd;\n" + "text-align: left;\n" + "padding: 8px;\n" + "}\n" + "th{\n" + "background-color:#2196F3;\n" + "color: white;\n" + "}\n" + "</style>" + "<h2>TABLA DE TOKENS</h2>\n" + "<table>\n" + "<tr>\n" + "<th>NO.</th>\n" + "<th>FILA</th>\n" + "<th>COLUMNA</th>\n" + "<th>TIPO</th>\n" + "<th>DESCRIPCION</th>\n" + "</tr>\n" + vartoken + "</table>";
  fs.writeFileSync('./token.html', token_report);
}

exports.gramaticaController = new gramaticacontroller();