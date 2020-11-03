"use strict";

var contador = 0;

function get_cont() {
  return contador++;
}

var vent_focus = "pestana1";

function get_vent() {
  return vent_focus;
}

function set_vent(vent) {
  vent_focus = vent;
}

var lista = new Array();

function linkedlist(pestana, nombre) {
  var obj = new Object();
  obj.pestana = pestana;
  obj.nombre = nombre;
  lista.push(obj);
}

function deletepes(pestana) {
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].pestana == pestana) {
      delete lista[i];
    }
  }
}
/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/


function index(pestanias, pestania) {
  var id = pestania.replace('pestana', '');
  set_vent('textarea' + id);
  var pestanna1 = document.getElementById(pestania);
  var listaPestannas = document.getElementById(pestanias);
  var cpestanna = document.getElementById('c' + pestania);
  var listacPestannas = document.getElementById('contenido' + pestanias);
  var i = 0;

  while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined') {
    $(document).ready(function () {
      $(listacPestannas.getElementsByTagName('div')[i]).css('display', 'none');
      $(listaPestannas.getElementsByTagName('li')[i]).css('background', '');
      $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom', '');
    });
    i += 1;
  }

  $(document).ready(function () {
    $(cpestanna).css('display', '');
    $(pestanna1).css('background', 'dimgray');
    $(pestanna1).css('padding-bottom', '2px');
  });

  try {
    var act = document.getElementById('cpestana' + id);
    var tact = document.getElementById('textarea' + id);

    while (act.firstChild) {
      act.removeChild(act.firstChild);
    }

    act.appendChild(tact);
    var editor = CodeMirror(act, {
      lineNumbers: true,
      value: tact.value,
      matchBrackets: true,
      styleActiveLine: true,
      theme: "eclipse",
      mode: "text/x-java"
    }).on('change', function (editor) {
      tact.value = editor.getValue();
    });
  } catch (error) {}
}
/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/


function agregar() {
  var x = get_cont();
  var lu = document.getElementById("lista");
  var li = document.createElement("li");
  li.setAttribute('id', 'pestana' + x);
  var a = document.createElement("a");
  a.setAttribute('id', 'a' + x);
  a.setAttribute('href', 'javascript:index("pestanas","pestana' + x + '")');
  a.text = 'pestana' + x;
  li.appendChild(a);
  lu.appendChild(li);
  index("pestanas", "pestana" + x);
  var contenido = document.getElementById("contenidopestanas");
  var divp = document.createElement("div");
  divp.setAttribute('id', 'cpestana' + x);
  var ta = document.createElement("textarea");
  ta.setAttribute('id', 'textarea' + x);
  ta.setAttribute('name', 'textarea' + x);
  ta.setAttribute('class', 'ta');
  ta.setAttribute('style', 'display:none');
  ta.cols = 123;
  ta.rows = 30;
  divp.appendChild(ta);
  contenido.appendChild(divp);
  var act = document.getElementById('cpestana' + x);
  var tact = document.getElementById('textarea' + x);
  var editor = CodeMirror(act, {
    lineNumbers: true,
    value: tact.value,
    matchBrackets: true,
    styleActiveLine: true,
    theme: "eclipse",
    mode: "text/x-java"
  }).on('change', function (editor) {
    tact.value = editor.getValue();
  });
}

function quitar() {
  try {
    var lu = document.getElementById("lista");
    lu.removeChild(document.getElementById(get_vent().replace("textarea", "pestana")));
    var contenido = document.getElementById("contenidopestanas");
    contenido.removeChild(document.getElementById(get_vent().replace("textarea", "cpestana")));
    deletepes(get_vent());
  } catch (error) {}
}
/*-----------------------------------------------File---------------------------------------------------*/


function AbrirArchivo(files) {
  var file = files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var act = document.getElementById(get_vent().replace("textarea", "cpestana"));
    var tact = document.getElementById(get_vent());
    tact.value = e.target.result;

    while (act.firstChild) {
      act.removeChild(act.firstChild);
    }

    act.appendChild(tact);
    var editor = CodeMirror(act, {
      lineNumbers: true,
      value: tact.value,
      matchBrackets: true,
      styleActiveLine: true,
      theme: "eclipse",
      mode: "text/x-java"
    }).on('change', function (editor) {
      tact.value = editor.getValue();
    });
  };

  reader.readAsText(file);
  file.clear;
  var a = document.getElementById(get_vent().replace("textarea", "a"));
  a.text = file.name;
  linkedlist(get_vent(), file.name);
  var file_input = document.getElementById("fileInput");
  document.getElementById('fileInput').value = "";
}

function DescargarArchivo() {
  var ta = document.getElementById(get_vent());
  var contenido = ta.value; //texto de vent actual
  //formato para guardar el archivo

  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth() + 1;
  var yyyy = hoy.getFullYear();
  var HH = hoy.getHours();
  var MM = hoy.getMinutes();
  var formato = get_vent().replace("textarea", "") + "_" + dd + "_" + mm + "_" + yyyy + "_" + HH + "_" + MM;
  var nombre = "Archivo" + formato + ".java"; //nombre del archivo

  var file = new Blob([contenido], {
    type: 'text/plain'
  });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, nombre);
  } else {
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function traducir() {
  var ta = document.getElementById(get_vent());
  var data = {
    entrada: ta.value
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
      console.log(data.arbol);
      console.log(data.error);
      var btngraph = "rep_ast";
      var graph = document.getElementById("graph");
      var js = "btnjs";
      document.getElementById(btngraph).addEventListener('click', function () {
        d3.select(graph).graphviz().renderDot('digraph  {a -> b}');
      });
      document.getElementById(js).addEventListener('click', function () {
        var ta = document.getElementById(get_vent());
        var contenido = ta.value; //texto de vent actual

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(data.traduccion);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
      });
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

      console.log(error);
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