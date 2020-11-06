"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lista_Error = function Lista_Error(error) {
  _classCallCheck(this, Lista_Error);

  this.error = error;

  var gramaticaController = require('../../routes/gramatica.route');

  var send = new gramaticaController["default"]();
  send.getError(this.error);
};

exports.Lista_Error = Lista_Error;