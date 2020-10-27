"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Error =
/*#__PURE__*/
function () {
  function Error() {
    _classCallCheck(this, Error);

    this.error = new Array();
  }

  _createClass(Error, [{
    key: "getError",
    value: function getError(error) {
      this.error = error;
    }
  }, {
    key: "sendError",
    value: function sendError() {
      console.log(this.error);
    }
  }]);

  return Error;
}();

exports.Error = Error;