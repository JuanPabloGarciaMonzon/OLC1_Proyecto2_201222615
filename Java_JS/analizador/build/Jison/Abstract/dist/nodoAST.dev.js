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
    this.error = new Array();
    this.valor = valor;
  }

  _createClass(nodoAST, [{
    key: "setHijos",
    value: function setHijos(hijos) {
      try {
        this.hijos = hijos;
      } catch (error) {
        console.log("SETHIJOS:" + error);
      }
    }
  }, {
    key: "agregarHijo",
    value: function agregarHijo(cad) {
      try {
        this.hijos.push(new nodoAST(cad));
      } catch (error) {
        console.log("AGREGARHIJO:" + error);
      }
    }
  }, {
    key: "excepcion",
    value: function excepcion() {
      console.log("EXCEPCION");
    }
  }, {
    key: "agregarHijos",
    value: function agregarHijos(hijos) {
      try {
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
      } catch (error) {
        console.log("AGREGARHIJOS:" + error);
      }
    }
  }, {
    key: "agregarHijo2",
    value: function agregarHijo2(hijo) {
      try {
        this.hijos.push(hijo);
      } catch (error) {
        console.log("AGREGARHIJO2:" + error);
      }
    }
  }, {
    key: "agregarPrimerHijo",
    value: function agregarPrimerHijo(cad) {
      try {
        this.hijos.unshift(new nodoAST(cad));
      } catch (error) {
        console.log("AGREGARPRIMERHIJO:" + error);
      }
    }
  }, {
    key: "agregarPrimerHijo2",
    value: function agregarPrimerHijo2(hijo) {
      try {
        this.hijos.unshift(hijo);
      } catch (error) {
        console.log("AGREGARPRIMERHIJO2:" + error);
      }
    }
  }, {
    key: "getValor",
    value: function getValor() {
      try {
        return this.valor;
      } catch (error) {
        console.log("GETVALOR:" + error);
      }
    }
  }, {
    key: "setValor",
    value: function setValor(cad) {
      try {
        this.valor = cad;
      } catch (error) {
        console.log("SETVALOR:" + error);
      }
    }
  }, {
    key: "getHijos",
    value: function getHijos() {
      try {
        return this.hijos;
      } catch (error) {
        console.log("GETHIJOS:" + error);
      }
    }
  }]);

  return nodoAST;
}();

exports["default"] = nodoAST;