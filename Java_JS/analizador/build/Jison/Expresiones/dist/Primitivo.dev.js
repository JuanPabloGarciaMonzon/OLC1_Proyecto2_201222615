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

var nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));

var Primitivo =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(Primitivo, _instruccion_1$Instru);

  function Primitivo(valor, fila, columna) {
    var _this;

    _classCallCheck(this, Primitivo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Primitivo).call(this, fila, columna));
    _this.valor = valor;
    return _this;
  }

  _createClass(Primitivo, [{
    key: "getNodo",
    value: function getNodo() {
      try {
        var nodo = new nodoAST_1["default"]("PRIMITIVO");

        if (this.valor[0] == '"' || this.valor[0] == "'") {
          nodo.agregarHijo(this.valor.substr(1, this.valor.length - 2));
        } else {
          nodo.agregarHijo(this.valor);
        }

        return nodo;
      } catch (error) {
        console.log("PRIMITIVO_GETNODO_ERROR:" + error);
      }
    }
  }, {
    key: "traducir",
    value: function traducir() {
      try {
        return this.valor;
      } catch (error) {
        console.log("PRIMITIVO_TRADUCIR_ERROR:" + error);
      }
    }
  }]);

  return Primitivo;
}(instruccion_1.Instruccion);

exports["default"] = Primitivo;