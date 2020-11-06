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

var Error_1 = __importDefault(require("../Jison/Instrucciones/Error"));

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
        var error = TEMP.tabla_errores;
        console.log(error);
        var token = TEMP.tabla_tokens;
        var traduccion = ''; // console.log(error);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = AST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var instruccion = _step.value;

            if (instruccion instanceof Error_1["default"]) {
              "".concat(instruccion.imprimir());
              continue;
            }

            traduccion += instruccion.traducir();
            if (traduccion instanceof Error_1["default"]) "".concat(m.imprimir());
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
            if (_instruccion instanceof Error_1["default"]) continue;
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
      } catch (err) {
        console.log("GRAMATICA_CONTROLLER_ERROR:" + err);
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
  try {
    console.log(raiz.getValor());
    dot = "";
    dot += "digraph {\n";
    dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0", raiz);
    dot += "}";
    return dot;
  } catch (error) {
    console.log("GETDOT_ERROR" + error);
  }
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
    console.log("RECORRER_AST_ERROR:" + error);
  }
}

exports.gramaticaController = new gramaticacontroller();