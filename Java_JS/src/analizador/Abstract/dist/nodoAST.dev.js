"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var nodoAST =
/*#__PURE__*/
function () {
  function nodoAST(valor) {
    _classCallCheck(this, nodoAST);

    this.hijos = new Array();
    this.valor = valor;
  }

  _createClass(nodoAST, [{
    key: "setHijos",
    value: function setHijos(hijos) {
      this.hijos = hijos;
    }
  }, {
    key: "agregarHijo",
    value: function agregarHijo(cad) {
      this.hijos.push(new nodoAST(cad));
    }
  }, {
    key: "agregarHijos",
    value: function agregarHijos(hijos) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hijos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var hijo = _step.value;
          this.hijos.push(hijo);
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
    }
  }, {
    key: "agregarHijo2",
    value: function agregarHijo2(hijo) {
      this.hijos.push(hijo);
    }
  }, {
    key: "agregarPrimerHijo",
    value: function agregarPrimerHijo(cad) {
      this.hijos.unshift(new nodoAST(cad));
    }
  }, {
    key: "agregarPrimerHijo2",
    value: function agregarPrimerHijo2(hijo) {
      this.hijos.unshift(hijo);
    }
  }, {
    key: "getValor",
    value: function getValor() {
      return this.valor;
    }
  }, {
    key: "setValor",
    value: function setValor(cad) {
      this.valor = cad;
    }
  }, {
    key: "getHijos",
    value: function getHijos() {
      return this.hijos;
    }
  }]);

  return nodoAST;
}();

exports["default"] = nodoAST;