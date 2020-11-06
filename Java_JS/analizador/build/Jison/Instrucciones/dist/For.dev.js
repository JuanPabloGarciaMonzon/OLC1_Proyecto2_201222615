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

var For =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(For, _instruccion_1$Instru);

  function For(condicion, condicion1, condicion2, instrucciones, linea, columna) {
    var _this;

    _classCallCheck(this, For);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(For).call(this, linea, columna));
    _this.condicion = condicion;
    _this.condicion1 = condicion1;
    _this.condicion2 = condicion2;
    _this.instrucciones = instrucciones;
    return _this;
  }

  _createClass(For, [{
    key: "getNodo",
    value: function getNodo() {
      try {
        var nodo = new nodoAST_1["default"]("FOR");
        nodo.agregarHijo("for");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion1.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo2(this.condicion2.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.instrucciones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var m = _step.value;
            if (m instanceof Error_1["default"]) continue;
            cas.agregarHijo2(m.getNodo());
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

        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
      } catch (error) {
        console.log("FOR_GETNODO_EXC:" + error);
      }
    }
  }, {
    key: "traducir",
    value: function traducir() {
      try {
        var condicion = this.condicion.traducir();
        if (condicion instanceof Error_1["default"]) return condicion;
        var condicion1 = this.condicion1.traducir();
        if (condicion1 instanceof Error_1["default"]) return condicion1;
        var condicion2 = this.condicion2.traducir();
        if (condicion2 instanceof Error_1["default"]) return condicion2;
        var instrucciones = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.instrucciones[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var instr = _step2.value;

            if (instr instanceof Error_1["default"]) {
              "".concat(instr.imprimir());
              continue;
            }

            instrucciones += instr.traducir();
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

        return "\nfor ( ".concat(condicion).concat(condicion1, ";").concat(condicion2, " ) {\n").concat(instrucciones, "\n}\n");
      } catch (error) {
        console.log("FOR_TRADUCIR_EXC:" + error);
      }
    }
  }]);

  return For;
}(instruccion_1.Instruccion);

exports["default"] = For;