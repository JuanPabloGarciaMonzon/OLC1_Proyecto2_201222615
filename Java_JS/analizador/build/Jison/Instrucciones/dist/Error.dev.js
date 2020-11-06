"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Error =
/*#__PURE__*/
function () {
  function Error(tipo, descripcion, fila, columna) {
    _classCallCheck(this, Error);

    this.tipo = tipo;
    this.descripcion = descripcion;
    this.fila = fila;
    this.columna = columna;
  }

  _createClass(Error, [{
    key: "toString",
    value: function toString() {
      return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
  }, {
    key: "imprimir",
    value: function imprimir() {
      return this.toString() + "\n";
    }
  }, {
    key: "getTipo",
    value: function getTipo() {
      return this.tipo;
    }
  }, {
    key: "getDesc",
    value: function getDesc() {
      return this.descripcion;
    }
  }, {
    key: "getFila",
    value: function getFila() {
      return this.fila;
    }
  }, {
    key: "getColumna",
    value: function getColumna() {
      return this.columna;
    }
  }]);

  return Error;
}();

exports["default"] = Error;