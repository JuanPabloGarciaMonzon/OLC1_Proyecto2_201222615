"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Error_1 = __importDefault(require("./Error"));
class If extends instruccion_1.Instruccion {
    constructor(condicion, instruccionesIf, linea, columna, instruccionesElse) {
        super(linea, columna);
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        if (instruccionesElse) {
            if (instruccionesElse instanceof instruccion_1.Instruccion) {
                this.elseif = instruccionesElse;
            }
            else {
                this.instruccionesElse = instruccionesElse;
            }
        }
    }
    getNodo() {
        try {
            var nodo = new nodoAST_1.default("IF");
            nodo.agregarHijo("if");
            nodo.agregarHijo("(");
            nodo.agregarHijo2(this.condicion.getNodo());
            nodo.agregarHijo(")");
            nodo.agregarHijo("{");
            var cas = new nodoAST_1.default("INSTRUCCIONES IF");
            for (let m of this.instruccionesIf) {
                if (m instanceof Error_1.default)
                 continue;
                cas.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(cas);
            nodo.agregarHijo("}");
            if (this.instruccionesElse != undefined) {
                nodo.agregarHijo("ELSE");
                nodo.agregarHijo("{");
                var el = new nodoAST_1.default("INSTRUCCIONES ELSE");
                for (let m of this.instruccionesElse) {
                    if (m instanceof Error_1.default)
                     continue;
                    el.agregarHijo2(m.getNodo());
                }
                nodo.agregarHijo2(el);
                nodo.agregarHijo("}");
            }
            if (this.elseif != undefined) {
                var elif = new nodoAST_1.default("ELSE IF");
                elif.agregarHijo2(this.elseif.getNodo());
                nodo.agregarHijo2(elif);
            }
            return nodo;  
        } catch (error) {
            console.error("IF_GETNODO_ERROR"+error);
        }

    }
    traducir() {
        try {
            var val = '';
            var condicion = this.condicion.traducir();
            if (condicion instanceof (Error_1.default))
            return condicion;

            var instruccionesIF = '';
            for (let insIf of this.instruccionesIf) {
                if (insIf instanceof Error_1.default) {
                    `${insIf.imprimir()}`;
                    continue;
                }
                instruccionesIF += `${insIf.traducir()}\n`;
            }
            val += `if ( ${condicion} ) {\n${instruccionesIF} }`;
            if (this.elseif != undefined) {
                var elseIF = this.elseif.traducir();
                if (elseIF instanceof (Error_1.default))
                 return elseIF;

                val += `else ${elseIF}`;
            }
            else if (this.instruccionesElse != undefined) {
                var instruccionesELSE = '';
                for (let insElse of this.instruccionesElse) {
                    if (insElse instanceof Error_1.default) {
                        `${insElse.imprimir()}`;
                        continue;
                    }
                    instruccionesELSE += `${insElse.traducir()}\n`;
                }
                val += `else {\n${instruccionesELSE} }`;
            }
            return val + '\n';   
        } catch (error) {
            console.error("IF_TRADUCIR_ERROR"+error);
        }

    }
}
exports.default = If;
//# sourceMappingURL=If.js.map