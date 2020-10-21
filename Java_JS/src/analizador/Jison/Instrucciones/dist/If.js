"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var instruccion_1 = require("../Abstract/instruccion");
var nodoAST_1 = require("../Abstract/nodoAST");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(condicion, instruccionesIf, linea, columna, instruccionesElse) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.instruccionesIf = instruccionesIf;
        if (instruccionesElse) {
            if (instruccionesElse instanceof instruccion_1.Instruccion) {
                _this.elseif = instruccionesElse;
            }
            else {
                _this.instruccionesElse = instruccionesElse;
            }
        }
        return _this;
    }
    If.prototype.getNodo = function () {
        var nodo = new nodoAST_1["default"]("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1["default"]("INSTRUCCIONES IF");
        for (var _i = 0, _a = this.instruccionesIf; _i < _a.length; _i++) {
            var m = _a[_i];
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        if (this.instruccionesElse != undefined) {
            nodo.agregarHijo("ELSE");
            nodo.agregarHijo("{");
            var el = new nodoAST_1["default"]("INSTRUCCIONES ELSE");
            for (var _b = 0, _c = this.instruccionesElse; _b < _c.length; _b++) {
                var m = _c[_b];
                el.agregarHijo2(m.getNodo());
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
    };
    If.prototype.traducir = function () {
        var val = '';
        var condicion = this.condicion.traducir();
        var instruccionesIF = '';
        for (var _i = 0, _a = this.instruccionesIf; _i < _a.length; _i++) {
            var insIf = _a[_i];
            instruccionesIF += insIf.traducir() + "\n";
        }
        val += "if ( " + condicion + " ) {\n" + instruccionesIF + " }";
        if (this.elseif != undefined) {
            val += "else if " + this.elseif.traducir();
        }
        else if (this.instruccionesElse != undefined) {
            var instruccionesELSE = '';
            for (var _b = 0, _c = this.instruccionesElse; _b < _c.length; _b++) {
                var insElse = _c[_b];
                instruccionesELSE += insElse.traducir() + "\n";
            }
            val += "else {\n" + instruccionesELSE + " }";
        }
        return val + '\n';
    };
    return If;
}(instruccion_1.Instruccion));
exports["default"] = If;
