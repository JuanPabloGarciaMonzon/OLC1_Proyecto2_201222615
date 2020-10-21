%{
    let test = 1 ;
    var logerror;
    logerror = [];
    var logsintac = [];
    var raiz = [];
    var cadhtml = '';
    var errcont;
    var traduccion = '';
    var flagerr = 0;
    errcont = 0;
    
    if(logerror.length > 0){
        console.log("****populado****");
    }

%}

/* lexical grammar */
%lex

%options case-insensitive

%%

\s+                   /* skip whitespace */
"//".*					return 'coment_s'//{ yytext = yytext.substr(2); return 'coment_s'; }				//	 // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		return 'coment_m'//{ yytext = yytext.substr(2,yyleng-3); return 'coment_m'; } //	// comentario multiple líneas
/***PALABRAS RESERVADAS*** */
/* tipos de datos */

"int"                  return 'r_int';
"double"               return 'r_double';
"char"                 return 'r_char';
"bool"                 return 'r_bool';
"string"               return 'r_string';
"static"               return 'r_static';
"args"                 return 'r_args';
"void"                 return 'r_void';
"main"                 return 'r_main';
"if"                   return 'r_if';
"switch"               return 'r_switch';
"case"                 return 'r_case';
"default"              return 'r_default';
"break"                return 'r_break';
"continue"             return 'r_continue';
"return"               return 'r_return';
"else"                 return 'r_else';
"true"                 return 'r_true';
"false"                return 'r_false';
"for"                  return 'r_for';
"public"               return 'r_public';
"class"                return 'r_class';
"interface"            return 'r_interface';
"while"                return 'r_while';
"do"                   return 'r_do';
"System.out.print"     return 'r_print';
"System.out.println"   return 'r_println';
/*SIMBOLOS Y SIGNOS DE COMPARACION*/
"&&"	               return 's_and';
"||"		       return 's_or';
"!="		       return 's_diferencia';
"!"	               return 's_not';
"^"	               return 's_xor';
"<="		       return 's_meniq';
">="		       return 's_mayiq';
"=="		       return 's_igualdad';
"<"	               return 's_menq';
">"	               return 's_mayq';


/*SIMBOLOS DE OPERACION Y ASIGNACION Y FIN DE LINEA*/
"="                    return '=';
";"                    return 's_pyc';
","                    return 's_coma';
":"                    return 's_dpuntos';
"."                    return '.';
'++'                   return 's_inc';
"--"                   return 's_dec';
"*"                    return 's_por';
"/"                    return 's_div';

"-"                    return 's_menos';
"+"                    return 's_mas';

"("                    return '(';
")"                    return ')';
"["                    return '[';
"]"                    return ']';
"{"                    return 's_llave_abre';
"}"                    return 's_llave_cierra';
/*ER*/

[0-9]+("."[0-9]+)?\b   return 'NUMBER';
\"[^\"]*\"	       return 'cadena';
\'[a-zA-Z0-9]\'        return 'char';
[a-zA-Z]+[a-zA-Z_0-9]* return 'identificador';


// EOF means "end of file"
<<EOF>>               return 'EOF';
// any other characters will throw an error
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
                        errcont++; 
                        var lexerror = {
                            numero : errcont,
                            tipo : 'Lexico',
                            linea : yylloc.first_line ,
                            columna : yylloc.first_column,
                            descripcion : 'El Caracter '+yytext+' no pertenece al lenguaje'
                        }
                        logerror.push(lexerror);
                        }
//return 'INVALID'

/lex

%{
    const Aritmetica         = require('./Expresiones/Aritmetica');
    const Identificador      = require('./Expresiones/Identificador');
    const Logica             = require('./Expresiones/Logica');
    const Primitivo          = require('./Expresiones/Primitivo');
    const Relacional         = require('./Expresiones/Relacional');

    const Asignacion         = require('./Instrucciones/Asignacion');
    const Break              = require('./Instrucciones/Break');
    const Call_Function      = require('./Instrucciones/Call_Function');
    const Clase              = require('./Instrucciones/Clase');
    const Comentario         = require('./Instrucciones/Comentario');
    const Continue           = require('./Instrucciones/Continue');
    const Declaracion        = require('./Instrucciones/Declaracion');
    const Do_While           = require('./Instrucciones/Do_While');
    const For                = require('./Instrucciones/For');
    const Funcion_Main       = require('./Instrucciones/Funcion_Main');
    const Funcion            = require('./Instrucciones/Funcion');
    const If                 = require('./Instrucciones/If');
    const Interface          = require('./Instrucciones/Interface');
    const Main               = require('./Instrucciones/Main');
    const Metodo             = require('./Instrucciones/Metodo');
    const Parametros         = require('./Instrucciones/Parametros');
    const Print              = require('./Instrucciones/Print');
    const While              = require('./Instrucciones/While');


%}

/*%left 's_or'
%left 's_and'
%left 's_xor'
%left 's_igualdad' 's_diferencia'
%left 's_mayq' 's_menq' 's_mayiq' 's_meniq' 
%left '+' '-'
%left '*' '/'
%right 'UMENOS' 'UNOT'*/

%start I
%% /* language grammar */

// At the top level, you explicitly return
// the result. $1 refers to the first child node,
// i.e. the "e"

I 
        :S EOF {return $1;}
;

S 
        :SD {$$ = [$1]; }
;

SD 
        :SD CLASE_INT{$1.push($2); $$ = $1;}
        |CLASE_INT{$$ = [$1];}
;

CLASE_INT
        :r_public r_class     identificador s_llave_abre L_INSTRUCCIONES s_llave_cierra{$$ = new Clase.default($3, $5, @1.first_line, @1.first_column);}
        |r_public r_interface identificador s_llave_abre L_INSTRUCCIONES s_llave_cierra{$$ = new Clase.default($3, $5, @1.first_line, @1.first_column);}
        |COMENTARIO{$$ = $1;}

;

COMENTARIO
        :coment_m{$$ = new Comentario.default($1, @1.first_line, @1.first_column);}
        |coment_s{$$ = new Comentario.default($1, @1.first_line, @1.first_column);}
;

PANICO 
        :error s_pyc {console.log('Este es un error sintáctico: ' +   yytext   + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
        |error s_llave_cierra {console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;
//-------------------------------------------------------------//
L_INSTRUCCIONES
        :L_INSTRUCCIONES INSTRUCCIONES{$1.push($2); $$ = $1;}
        |INSTRUCCIONES{$$ = [$1];}
;
        INSTRUCCIONES
                :FORD s_pyc {$$ = $1;}
                |CONTADOR s_pyc {$$ = $1;}
                |PRINT s_pyc {$$ = $1;}
                |SENTENCIA_IF {$$ = $1;}
                |SENTENCIA_WHILE{$$ = $1;}
                |SENTENCIA_DOWHILE{$$ = $1;}
                |SENTENCIA_FOR{$$ = $1;}
                |BREAK{$$ = $1;}
                |CONTINUE{$$ = $1;}
                |RETURN{$$ = $1;}
                |METODO {$$ = $1;}
                |FUNCION {$$ = $1;}
                |FUNCION_MAIN {$$ = $1;}
                |CALL_F{$$ = $1;}
                |COMENTARIO{$$ = $1;}
                |PANICO{$$ = $1;}
        ;
//-------------------------------------------------------------//

L_INSTRUCCIONES_F
        :L_INSTRUCCIONES_F INSTRUCCIONES_F{$1.push($2); $$ = $1;}
        |INSTRUCCIONES_F{$$ = [$1];}
;

L_INSTRUCCIONES_M
        :L_INSTRUCCIONES_M INSTRUCCIONES_M{$1.push($2); $$ = $1;}
        |INSTRUCCIONES_M{$$ = [$1];}
;

//-------------------------------------------------------------//
INSTRUCCIONES_M
        :FORD s_pyc {$$ = $1;}
        |CONTADOR s_pyc {$$ = $1;}
        |PRINT s_pyc {$$ = $1;}
        |SENTENCIA_IF {$$ = $1;}
        |SENTENCIA_WHILE{$$ = $1;}
        |SENTENCIA_DOWHILE{$$ = $1;}
        |SENTENCIA_FOR{$$ = $1;}
        |BREAK{$$ = $1;}
        |CONTINUE{$$ = $1;}
        |CALL_F{$$ = $1;}
        |COMENTARIO{$$ = $1;}
        |PANICO{$$ = $1;}
;

INSTRUCCIONES_F
        :FORD s_pyc {$$ = $1;}
        |CONTADOR s_pyc {$$ = $1;}
        |PRINT s_pyc {$$ = $1;}
        |SENTENCIA_IF {$$ = $1;}
        |SENTENCIA_WHILE{$$ = $1;}
        |SENTENCIA_DOWHILE{$$ = $1;}
        |SENTENCIA_FOR{$$ = $1;}
        |BREAK{$$ = $1;}
        |CONTINUE{$$ = $1;}
        |RETURN{$$ = $1;}
        |CALL_F{$$ = $1;}
        |COMENTARIO{$$ = $1;}
        |PANICO{$$ = $1;}

;
//-------------------------------------------------------------//
FORD
        :DECLARACION{$$ = $1;}
        |ASIGNACION {$$ = $1;}
;

        DECLARACION 
                :TIPO LISTAID{ $$ = new Declaracion.default($1, $2,@1.first_line, @1.first_column);}
        ;

        ASIGNACION 
                :identificador '=' E {$$ = new Asignacion.default($1, $3, @1.first_line, @1.first_column);}
                |identificador{$$ = $1;}

        ;
//-------------------------------------------------------------//
SENTENCIA_IF
        : r_if '(' E ')' BLOQUE_FUNCION		        { $$ = new If.default($3, $5, @1.first_line, @1.first_column); }
        | r_if '(' E ')' BLOQUE_FUNCION r_else BLOQUE_FUNCION{ $$ = new If.default($3, $5, @1.first_line, @1.first_column, $7); }
        | r_if '(' E ')' BLOQUE_FUNCION r_else SENTENCIA_IF	{ $$ = new If.default($3, $5, @1.first_line, @1.first_column, $7); }
;
//-------------------------------------------------------------//
SENTENCIA_WHILE
        :r_while '(' E ')' BLOQUE_FUNCION { $$ = new While.default($3, $5, @1.first_line, @1.first_column); }
;
//-------------------------------------------------------------//
SENTENCIA_DOWHILE
        :r_do BLOQUE_FUNCION r_while '(' E ')' s_pyc{ $$ = new Do_While.default($2, $5, @1.first_line, @1.first_column); }
;
//-------------------------------------------------------------//
SENTENCIA_FOR
        :r_for '(' FORD s_pyc E s_pyc E ')' BLOQUE_FUNCION{$$ = new For.default($3, $5,$7,$9,@1.first_line, @1.first_column);}
;
//-------------------------------------------------------------//
BREAK
        :r_break s_pyc{$$ = new Break.default(@1.first_line, @1.first_column);}
;
CONTINUE
        :r_continue s_pyc{$$ = new Continue.default(@1.first_line, @1.first_column);}
;
RETURN
        :r_return E s_pyc{$$ = new Return.default($2,@1.first_line, @1.first_column);}
;
//-------------------------------------------------------------//
PRINT
        :r_print '(' E ')' { $$ = new Print.default($3, @1.first_line, @1.first_column);}
        |r_println '(' E ')'{ $$ = new Print.default($3, @1.first_line, @1.first_column);} 
        |r_print '('')' 
        |r_println '('')' 
;
//-------------------------------------------------------------//
METODO
        :r_public r_void identificador '(' PARAMETROS')'  BLOQUE_METODO{$$ = new Metodo.default($3, $5,$7, @1.first_line, @1.first_column); }

;

FUNCION
        :r_public TIPO identificador '(' PARAMETROS')' BLOQUE_FUNCION{$$ = new Funcion.default($2,$3,$5,$7, @1.first_line, @1.first_column);}

;

FUNCION_MAIN
        :r_public r_static r_void r_main '(' r_string '['']' r_args')' BLOQUE_FUNCION{$$ = new Main.default($11, @1.first_line, @1.first_column);}
        |r_public r_static r_void r_main '(' PARAMETROS')' BLOQUE_FUNCION{$$ = new Funcion_Main.default($6,$8, @1.first_line, @1.first_column);}

;
//-------------------------------------------------------------//
CALL_F
        :r_public r_void identificador '(' PARAMETROS ')' s_pyc {$$ = new Call_Function.default($3,$5,@1.first_line, @1.first_column);}

;
//-------------------------------------------------------------//
BLOQUE
        :s_llave_abre s_llave_cierra{}
        |s_llave_abre L_INSTRUCCIONES s_llave_cierra  {$$ = $2;}

;

BLOQUE_METODO
        :s_llave_abre s_llave_cierra{}
        |s_llave_abre L_INSTRUCCIONES_M s_llave_cierra  {$$ = $2;}

;

BLOQUE_FUNCION
        :s_llave_abre s_llave_cierra{}
        |s_llave_abre L_INSTRUCCIONES_F s_llave_cierra  {$$ = $2;}

;
//-------------------------------------------------------------//
LISTAID
        :LISTAID s_coma ASIGNACION {$1.push($2); $$ = $1;}
        |ASIGNACION{$$ = [$1];}
;
//-------------------------------------------------------------//
PARAMETROS
        :
        |PARAMETROS s_coma PARAM{$1.push($2); $$ = $1;}
        |PARAM{$$ = [$1];}
;

PARAM
        :TIPO E{$$ = new Parametros.default($1,$2,@1.first_line, @1.first_column);}
;
//-------------------------------------------------------------//
TIPO
        :r_int {$$ = $1}
        |r_char {$$ = $1}
        |r_boolean {$$ = $1}
        |r_double {$$ = $1}
        |r_string {$$ = $1}
;

//-------------------------------------------------------------//
CONTADOR
        :identificador s_inc{$$ = new Aritmetica.default('++', @1.first_line, @1.first_column, $1);}
        |identificador s_dec{$$ = new Aritmetica.default('--', @1.first_line, @1.first_column, $1);}
        |NUMBER s_inc{$$ = new Aritmetica.default('++', @1.first_line, @1.first_column, $1);}
        |NUMBER s_dec{$$ = new Aritmetica.default('--', @1.first_line, @1.first_column, $1);}
        
;
//-------------------------------------------------------------//
E
        :E s_mayq E2 {$$ = new Relacional.default($1, $3, '>', @1.first_line, @1.first_column);}
        |E s_menq E2 {$$ = new Relacional.default($1, $3, '<', @1.first_line, @1.first_column);}
        |E s_mayiq E2 {$$ = new Relacional.default($1, $3, '>=', @1.first_line, @1.first_column);}
        |E s_meniq E2{$$ = new Relacional.default($1, $3, '<=', @1.first_line, @1.first_column);}
        |E2 {$$ =  ${$1}}
;

E2
        :E2 s_igualdad E3 {$$ = new Relacional.default($1, $3, '==', @1.first_line, @1.first_column);}
        |E2 s_diferencia E3 {$$ = new Relacional.default($1, $3, '!=', @1.first_line, @1.first_column);}
        |E3{$$ =  ${$1}}

;

E3
        :E3 s_xor E4 {$$ = new Logica.default($1, $3, '^', @1.first_line, @1.first_column);}
        |E3 s_and E4 {$$ = new Logica.default($1, $3, '&&', @1.first_line, @1.first_column);}
        |E3 s_or  E4 {$$ = new Logica.default($1, $3, '||', @1.first_line, @1.first_column);}
        |E4 {$$ =  ${$1}}

;


E4
        :E4 s_mas   E5{$$ = new Aritmetica.default('+', @1.first_line, @1.first_column, $1, $3);}
        |E4 s_menos E5{$$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $1, $3);}
        |E5{$$ =  ${$1}}
;

E5
        :E5 s_por E6{  $$ = new Aritmetica.default('*', @1.first_line, @1.first_column, $1, $3);}
        |E5 s_div E6{  $$ = new Aritmetica.default('/', @1.first_line, @1.first_column,$1, $3);}
        |E6{$$ =  ${$1}}

;
E6
        :s_menos E7 { $$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $2);}
        |s_not E7 {  $$ = new Logica.default('!', @1.first_line, @1.first_column, $2);}
        |E7 s_inc {  $$ = new Aritmetica.default('++', @1.first_line, @1.first_column, $1);}
        |E7 s_dec{  $$ = new Aritmetica.default('--', @1.first_line, @1.first_column, $1);}
        |E7{$$ =  ${$1}}

;

        
E7
        :'(' E ')'{$$ = new Primitivo.default(`( ${$2} )`, @1.first_line, @1.first_column); }
        |identificador  { $$ = new Identificador.default($1, @1.first_line, @1.first_column); }
        |NUMBER{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |char{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |cadena{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |r_true{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |r_false{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
;

//-------------------------------------------------------------//

