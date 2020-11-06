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

var Error_1 = __importDefault(require("../Instrucciones/Error"));

var nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));

var Relacional =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(Relacional, _instruccion_1$Instru);

  function Relacional(operando1, operando2, operador, fila, columna) {
    var _this;

    _classCallCheck(this, Relacional);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Relacional).call(this, fila, columna));
    _this.operador = operador;
    _this.operando1 = operando1;
    _this.operando2 = operando2;
    return _this;
  }

  _createClass(Relacional, [{
    key: "getNodo",
    value: function getNodo() {
      try {
        var nodo = new nodoAST_1["default"]("RELACIONAL");
        nodo.agregarHijo2(this.operando1.getNodo());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo2(this.operando2.getNodo());
        return nodo;
      } catch (error) {
        console.log("RELACIONAL_GETNODO_ERROR:" + error);
      }
    }
  }, {
    key: "traducir",
    value: function traducir() {
      try {
        var op1 = this.operando1.traducir();
        if (op1 instanceof Error_1["default"]) return op1;
        var op2 = this.operando2.traducir();
        if (op2 instanceof Error_1["default"]) return op2;
        return op1 + this.operador + op2 + "";
      } catch (error) {
        console.log("RELACIONAL_TRADUCIR_ERROR:" + error);
      }
    }
  }]);

  return Relacional;
}(instruccion_1.Instruccion);

exports["default"] = Relacional;