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

var Logica =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(Logica, _instruccion_1$Instru);

  function Logica(operando1, operando2, operador, fila, columna) {
    var _this;

    _classCallCheck(this, Logica);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Logica).call(this, fila, columna));
    _this.operador = operador;

    if (!operando2) {
      _this.operandoU = operando1;
    } else {
      _this.operando1 = operando1;
      _this.operando2 = operando2;
    }

    return _this;
  }

  _createClass(Logica, [{
    key: "getNodo",
    value: function getNodo() {
      var nodo = new nodoAST_1["default"]("LOGICA");

      if (this.operandoU != null) {
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo2(this.operandoU.getNodo());
      } else {
        if (this.operando1 != undefined && this.operando2 != undefined) {
          nodo.agregarHijo2(this.operando1.getNodo());
          nodo.agregarHijo(this.operador + "");
          nodo.agregarHijo2(this.operando2.getNodo());
        }
      }

      return nodo;
    }
  }, {
    key: "traducir",
    value: function traducir() {
      if (this.operandoU != null) {
        return "".concat(this.operador, " ").concat(this.operandoU.traducir());
      } else {
        if (this.operando1 != undefined && this.operando2 != undefined) {
          return "".concat(this.operando1.traducir(), " ").concat(this.operador, " ").concat(this.operando2.traducir());
        }
      }
    }
  }]);

  return Logica;
}(instruccion_1.Instruccion);

exports["default"] = Logica;