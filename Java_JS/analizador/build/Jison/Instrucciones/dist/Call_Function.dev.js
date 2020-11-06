"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var instruccion_1 = require("../Abstract/instruccion");

var Error_1 = __importDefault(require("./Error"));

var nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));

var Call_Function =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(Call_Function, _instruccion_1$Instru);

  function Call_Function(tipo, identificador, parametros, linea, columna) {
    var _this;

    _classCallCheck(this, Call_Function);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Call_Function).call(this, linea, columna));
    _this.tipo = tipo;
    _this.identificador = identificador;
    _this.parametros = parametros;
    return _this;
  }

  _createClass(Call_Function, [{
    key: "getNodo",
    value: function getNodo() {
      try {
        var nodo = new nodoAST_1["default"]("CALL");

        if (this.tipo == "") {
          nodo.agregarHijo(this.identificador);
          nodo.agregarHijo("(");
          var par = new nodoAST_1["default"]("VALORES");
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.parametros[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var m = _step.value;
              if (m instanceof Error_1["default"]) continue;
              par.agregarHijo2(m.getNodo());
            }
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

          nodo.agregarHijo2(par);
          nodo.agregarHijo(")");
          nodo.agregarHijo(";");
          return nodo;
        } else if (this.tipo == "EXPRESION") {
          nodo.agregarHijo(this.identificador);
          nodo.agregarHijo("(");
          var par = new nodoAST_1["default"]("VALORES");
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.parametros[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _m = _step2.value;
              if (_m instanceof Error_1["default"]) continue;
              par.agregarHijo2(_m.getNodo());
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

          nodo.agregarHijo2(par);
          nodo.agregarHijo(")");
          return nodo;
        } else {
          nodo.agregarHijo("public");
          nodo.agregarHijo(this.tipo);
          nodo.agregarHijo(this.identificador);
          nodo.agregarHijo("(");
          var par = new nodoAST_1["default"]("VALORES");
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.parametros[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _m2 = _step3.value;
              if (_m2 instanceof Error_1["default"]) continue;
              par.agregarHijo2(_m2.getNodo());
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

          nodo.agregarHijo2(par);
          nodo.agregarHijo(")");
          nodo.agregarHijo(";");
          return nodo;
        }
      } catch (error) {
        console.log("CALL_FUNCTION_GETNODO_EXC:" + error);
      }
    }
  }, {
    key: "traducir",
    value: function traducir() {
      try {
        var parametros = '';
        var pam = '';
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.parametros[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var par = _step4.value;

            if (par instanceof Error_1["default"]) {
              "".concat(par.imprimir());
              continue;
            }

            parametros += par.traducir() + ",";
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

        pam = parametros.substring(0, parametros.length - 1);

        if (this.tipo == "") {
          return "".concat(this.identificador, " (").concat(pam, ");\n");
        } else if (this.tipo == "EXPRESION") {
          return "".concat(this.identificador, " (").concat(pam, ")");
        } else {
          return "\nfunction ".concat(this.identificador, " (").concat(pam, ");\n");
        }
      } catch (error) {
        console.log("CALL_FUNCTION_TRADUCIR_EXC:" + error);
      }
    }
  }]);

  return Call_Function;
}(instruccion_1.Instruccion);

exports["default"] = Call_Function;