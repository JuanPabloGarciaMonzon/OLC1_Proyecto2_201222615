"use strict";

function traducir() {
  var entrada = document.getElementById('entrada');
  var graph = document.getElementById('graph');
  var data = {
    entrada: entrada.value
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", "http://localhost:3000/jison", true);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(data));

  Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(Http.responseText);
      var error = '';
      var token = '';
      console.log(data.traduccion);
      document.getElementById('test').addEventListener('click', function () {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(data.traduccion);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
      });
      document.getElementById('salida').innerHTML = data.traduccion;
      console.log(data.arbol);
      d3.select(graph).graphviz().renderDot(data.arbol);

      try {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.error[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var er = _step.value;
            error += er;
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
      } catch (errors) {
        console.log("ERROR:" + errors);
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data.token[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tk = _step2.value;
          token += tk;
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

      console.log(token);
    }
  };
}