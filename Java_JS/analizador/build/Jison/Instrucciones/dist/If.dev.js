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

var If =
/*#__PURE__*/
function (_instruccion_1$Instru) {
  _inherits(If, _instruccion_1$Instru);

  function If(condicion, instruccionesIf, linea, columna, instruccionesElse) {
    var _this;

    _classCallCheck(this, If);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(If).call(this, linea, columna));
    _this.condicion = condicion;
    _this.instruccionesIf = instruccionesIf;

    if (instruccionesElse) {
      if (instruccionesElse instanceof instruccion_1.Instruccion) {
        _this.elseif = instruccionesElse;
      } else {
        _this.instruccionesElse = instruccionesElse;
      }
    }

    return _this;
  }

  _createClass(If, [{
    key: "getNodo",
    value: function getNodo() {
      try {
        var nodo = new nodoAST_1["default"]("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES IF");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.instruccionesIf[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _m = _step.value;
            cas.agregarHijo2(_m.getNodo());
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

        if (this.instruccionesElse != undefined) {
          nodo.agregarHijo("ELSE");
          nodo.agregarHijo("{");
          var el = new nodoAST_1["default"]("INSTRUCCIONES ELSE");
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.instruccionesElse[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var m = _step2.value;
              el.agregarHijo2(m.getNodo());
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

          nodo.agregarHijo2(el);
          nodo.agregarHijo("}");
        }

        if (this.elseif != undefined) {
          var elif = new nodoAST_1["default"]("ELSE IF");
          elif.agregarHijo2(this.elseif.getNodo());
          nodo.agregarHijo2(elif);
        }

        return nodo;
      } catch (error) {
        console.log("GETNODO_EXC:" + error);
      }
    }
  }, {
    key: "traducir",
    value: function traducir() {
      try {
        var val = '';
        var condicion = this.condicion.traducir();
        var instruccionesIF = '';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.instruccionesIf[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var insIf = _step3.value;
            instruccionesIF += "".concat(insIf.traducir(), "\n");
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

        val += "if ( ".concat(condicion, " ) {\n").concat(instruccionesIF, " }");

        if (this.elseif != undefined) {
          val += "else if ".concat(this.elseif.traducir());
        } else if (this.instruccionesElse != undefined) {
          var instruccionesELSE = '';
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this.instruccionesElse[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var insElse = _step4.value;
              instruccionesELSE += "".concat(insElse.traducir(), "\n");
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

          val += "else {\n".concat(instruccionesELSE, " }");
        }

        return val + '\n';
      } catch (error) {
        console.log("TRADUCIR_EXC:" + error);
      }
    }
  }]);

  return If;
}(instruccion_1.Instruccion);

exports["default"] = If;