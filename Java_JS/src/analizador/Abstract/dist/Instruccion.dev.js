"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Instruccion = void 0;

var Instruccion =
/*#__PURE__*/
function () {
  function Instruccion(linea, columna) {
    _classCallCheck(this, Instruccion);

    this.linea = linea;
    this.columna = columna;
  }

  _createClass(Instruccion, [{
    key: "setSalida",
    value: function setSalida(salida) {
      this.salida = salida;
    }
  }, {
    key: "getSalida",
    value: function getSalida() {
      return this.salida;
    }
  }]);

  return Instruccion;
}();

exports.Instruccion = Instruccion;