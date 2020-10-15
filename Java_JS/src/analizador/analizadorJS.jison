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
"!"	               return 's_not';
"^"	               return 's_xor';
"<="		       return 's_meniq';
">="		       return 's_mayiq';
"=="		       return 's_igualdad';
"!="		       return 's_diferencia';
"<"	               return 's_menq';
">"	               return 's_mayq';


/*SIMBOLOS DE OPERACION Y ASIGNACION Y FIN DE LINEA*/
"="                    return '=';
";"                    return 's_pyc';
","                    return 's_coma';
":"                    return 's_dpuntos';
"."                    return '.';
"*"                    return '*';
"/"                    return '/';
"-"                    return '-';
"+"                    return '+';
"++"                   return 's_inc';
"--"                   return 's_dec';
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
%left 's_or'
%left 's_and'
%left 's_xor'
%left 's_igualdad' 's_diferencia'
%left 's_mayq' 's_menq' 's_mayiq' 's_meniq' 
%left '+' '-'
%left '*' '/'
%right 'UMENOS' 'UNOT'

%start I
%% /* language grammar */

// At the top level, you explicitly return
// the result. $1 refers to the first child node,
// i.e. the "e"

I 
        :S EOF {}
;

S 
        :SD {}
;

SD 
        :SD CLASE_INT{}
        |CLASE_INT{}
;

CLASE_INT
        :r_public r_class     identificador s_llave_abre L_INSTRUCCIONES s_llave_cierra{}
        |r_public r_interface identificador s_llave_abre L_INSTRUCCIONES s_llave_cierra{}
        |COMENTARIO{}

;

COMENTARIO
        :coment_m{}
        |coment_s{}
;

PANICO 
        :error s_pyc {console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
        |error s_llave_cierra {console.log('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;
//-------------------------------------------------------------//
L_INSTRUCCIONES
        :L_INSTRUCCIONES INSTRUCCIONES{}
        |INSTRUCCIONES{}
        |L_INSTRUCCIONES MAS_MENOS s_pyc {}
        |MAS_MENOS s_pyc {}
;



        INSTRUCCIONES
                :FORD s_pyc {}
                |PRINT s_pyc {}
                |SENTENCIA_IF {}
                |SENTENCIA_WHILE{}
                |SENTENCIA_DOWHILE{}
                |SENTENCIA_FOR{}
                |BREAK{}
                |CONTINUE{}
                |RETURN{}
                |METODO {}
                |FUNCION {}
                |FUNCION_MAIN {}
                |CALL_F{}
                |COMENTARIO{}
                |PANICO{}
        ;
//-------------------------------------------------------------//

L_INSTRUCCIONES_F
        :L_INSTRUCCIONES_F INSTRUCCIONES_F{}
        |INSTRUCCIONES_F{}
        |L_INSTRUCCIONES_F MAS_MENOS s_pyc {}
        |MAS_MENOS s_pyc {}
;

L_INSTRUCCIONES_M
        :L_INSTRUCCIONES_M INSTRUCCIONES_M{}
        |INSTRUCCIONES_M{}
        |L_INSTRUCCIONES_M MAS_MENOS s_pyc {}
        |MAS_MENOS s_pyc {}
;

//-------------------------------------------------------------//
INSTRUCCIONES_M
        :FORD s_pyc {}
        |PRINT s_pyc {}
        |SENTENCIA_IF {}
        |SENTENCIA_WHILE{}
        |SENTENCIA_DOWHILE{}
        |SENTENCIA_FOR{}
        |BREAK{}
        |CONTINUE{}
        |CALL_F{}
        |COMENTARIO{}
        |PANICO{}
;

INSTRUCCIONES_F
        :FORD s_pyc {}
        |PRINT s_pyc {}
        |SENTENCIA_IF {}
        |SENTENCIA_WHILE{}
        |SENTENCIA_DOWHILE{}
        |SENTENCIA_FOR{}
        |BREAK{}
        |CONTINUE{}
        |RETURN{}
        |CALL_F{}
        |COMENTARIO{}
        |PANICO{}

;
//-------------------------------------------------------------//
FORD
        :DECLARACION{}
        |ASIGNACION {}
;

        DECLARACION 
                :TIPO LISTAID{}
        ;

        ASIGNACION 
                :identificador '=' E {}

        ;
//-------------------------------------------------------------//
SENTENCIA_IF
        :L_CONDICIONES r_else BLOQUE_FUNCION  {}
        |L_CONDICIONES {}
;
        L_CONDICIONES
                :L_CONDICIONES r_else r_if '(' E ')' BLOQUE_FUNCION {}
                |r_if '(' E ')'  BLOQUE_FUNCION  {}
        ;
//-------------------------------------------------------------//
SENTENCIA_WHILE
        :r_while '(' E ')' BLOQUE_FUNCION {}
;
//-------------------------------------------------------------//
SENTENCIA_DOWHILE
        :r_do BLOQUE_FUNCION r_while '(' E ')' s_pyc{}
;
//-------------------------------------------------------------//
SENTENCIA_FOR
        :r_for '(' FORD s_pyc E s_pyc E ')' BLOQUE_FUNCION{}
;
//-------------------------------------------------------------//
BREAK
        :r_break s_pyc{}
;
CONTINUE
        :r_continue s_pyc{}
;
RETURN
        :r_return E s_pyc{}
;
//-------------------------------------------------------------//
PRINT
        :r_print '(' E ')' 
        |r_println '(' E ')' 
        |r_print '('')' 
        |r_println '('')' 
;
//-------------------------------------------------------------//
METODO
        :r_public r_void identificador '(' PARAMETROS')'  BLOQUE_METODO{}

;

FUNCION
        :r_public TIPO identificador '(' PARAMETROS')' BLOQUE_FUNCION{}

;

FUNCION_MAIN
        :r_public r_static r_void r_main '(' r_string '['']' r_args')' BLOQUE_FUNCION{}
        |r_public r_static r_void r_main '(' PARAMETROS')' BLOQUE_FUNCION{}

;
//-------------------------------------------------------------//
CALL_F
        :r_public r_static r_void identificador '(' PARAMETROS ')' s_pyc {}

;
//-------------------------------------------------------------//
BLOQUE
        :s_llave_abre s_llave_cierra
        |s_llave_abre L_INSTRUCCIONES s_llave_cierra  {}

;

BLOQUE_METODO
        :s_llave_abre s_llave_cierra
        |s_llave_abre L_INSTRUCCIONES_M s_llave_cierra  {}

;

BLOQUE_FUNCION
        :s_llave_abre s_llave_cierra
        |s_llave_abre L_INSTRUCCIONES_F s_llave_cierra  {}

;
//-------------------------------------------------------------//
LISTAID
        :LISTAID s_coma E{}
        |LISTAID '=' E{}
        |E{}
;
//-------------------------------------------------------------//
PARAMETROS
        :
        |PARAMETROS s_coma PARAM{}
        |PARAM{}
;

PARAM
        :TIPO E{}
;
//-------------------------------------------------------------//
TIPO
        :r_int {}
        |r_char {}
        |r_boolean {}
        |r_double {}
        |r_string {}
;
//-------------------------------------------------------------//
E
        :E s_igualdad E {}
        |E s_diferencia E {}
        |E s_xor E {}
        |E s_and E {}
        |E s_or E {}
        |E s_mayq E {}
        |E s_menq E {}
        |E s_mayiq E {}
        |E s_meniq E{}
        |E '*' E       { }
        |E '+' E       { }
        |E '-' E       { }
        |E '/' E       { }
        |'-' E %prec UMENOS {  }
        |s_not E %prec UNOT {  }
        |'('E')'
        |MAS_MENOS
        |VALORES {}
;

VALORES
        :identificador
        |NUMBER
        |char
        |cadena
        |r_true
        |r_false
;
MAS_MENOS
        :E '+''+'      {  }
        |E '-''-'         {  }
;
//-------------------------------------------------------------//

