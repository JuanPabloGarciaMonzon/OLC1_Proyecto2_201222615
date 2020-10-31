/* lexical grammar */

%{
        var contadorE = 0;
        var contadorT = 0;
        var lista_error  = new Array();
        var lista_tokens = new Array();
        
        %}
%lex

%options case-insensitive

%%
\s+                   /* skip whitespace */
"//".*					{
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Comentario Simple",yytext]);
        return 'coment_s';}

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	{
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Comentario Multiple",yytext]);
        return 'coment_m';
        }
/***PALABRAS RESERVADAS*** */
/* tipos de datos */

"int"   {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Int",yytext]);
        return 'r_int';
        }
"double" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Double",yytext]);
        return 'r_double';
        }               

"char" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Char",yytext]);
        return 'r_char';
        }                  
"boolean" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Boolean",yytext]);
        return 'r_boolean';
        }                   
"string" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"String",yytext]);
        return 'r_string';
        }                
"static" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Static",yytext]);
        return 'r_static';
        }                 
"args" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Args",yytext]);
        return 'r_args';
        }                 
"void" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Void",yytext]);
        return 'r_void';
        }                 
"main" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Main",yytext]);
        return 'r_main';
        }                 
"if" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"If",yytext]);
        return 'r_if';
        }                   

"break" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Break",yytext]);
        return 'r_break';
        }                 
"continue" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Continue",yytext]);
        return 'r_continue';
        }              
"return" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Return",yytext]);
        return 'r_return';
        }                
"else" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Else",yytext]);
        return 'r_else';
        }                  
"true" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"True",yytext]);
        return 'r_true';
        }                    
"false" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"False",yytext]);
        return 'r_false';
        }                  
"for" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"For",yytext]);
        return 'r_for';
        }                    
"public" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Public",yytext]);
        return 'r_public';
        }               
"class" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Class",yytext]);
        return 'r_class';
        }               
"interface" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Interface",yytext]);
        return 'r_interface';
        }             
"while"  {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"While",yytext]);
        return 'r_while';
        }              
"do" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Do",yytext]);
        return 'r_do';
        }                    
"System.out.print" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Print",yytext]);
        return 'r_print';
        }       
"System.out.println" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Print",yytext]);
        return 'r_println';
        }     
/*SIMBOLOS Y SIGNOS DE COMPARACION*/
"&&" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"And",yytext]);
        return 's_and';
        } 	               
"||" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Or",yytext]);
        return 's_or';
        } 		       
"!=" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Diferencia",yytext]);
        return 's_diferencia';
        } 		       
"!" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Not",yytext]);
        return 's_not';
        } 	               
"^" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Xor",yytext]);
        return 's_xor';
        } 	              
"<=" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"MenIq",yytext]);
        return 's_meniq';
        } 		       
">=" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"MayIq",yytext]);
        return 's_mayiq';
        } 		       
"==" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Igualdad",yytext]);
        return 's_igualdad';
        } 		       
"<" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"MenQ",yytext]);
        return 's_menq';
        } 	               
">" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"MayQ",yytext]);
        return 's_mayq';
        }	               


/*SIMBOLOS DE OPERACION Y ASIGNACION Y FIN DE LINEA*/
"=" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Igual",yytext]);
        return '=';
        }                    
";" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Punto_Coma",yytext]);
        return 's_pyc';
        }                      
"," {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Coma",yytext]);
        return 's_coma';
        }                      
":" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Dos Puntos",yytext]);
        return 's_dpuntos';
        }                       
"." {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Punto",yytext]);
        return '.';
        }                     
'++' {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Incremento",yytext]);
        return 's_inc';
        }                    
"--" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Decremento",yytext]);
        return 's_dec';
        }                    
"*" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Por",yytext]);
        return 's_por';
        }                    
"/" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Div",yytext]);
        return 's_div';
        }                    

"-" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Menos",yytext]);
        return 's_menos';
        }                     
"+" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"Mas",yytext]);
        return 's_mas';
        }                      

"(" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"ParA",yytext]);
        return '(';
        }                      
")" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"ParC",yytext]);
        return ')';
        }                     
"[" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"CorcA",yytext]);
        return '[';
        }                   
"]" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"CorcC",yytext]);
        return ']';
        }                     
"{" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"LlaveA",yytext]);
        return 's_llave_abre';
        }                    
"}" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"LlaveC",yytext]);
        return 's_llave_cierra';
        }                       
/*ER*/

[0-9]+("."[0-9]+)?\b {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"RegexNumero",yytext]);
        return 'NUMBER';
        }    
\"[^\"]*\" {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"RegexString",yytext]);
        return 'cadena';
        } 	       
\'[a-zA-Z0-9]\' {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"RegexChar",yytext]);
        return 'char';
        }        
[a-zA-Z]+[a-zA-Z_0-9]* {
        contadorT++;        
        lista_tokens.push([contadorT,yylloc.first_line,yylloc.first_column,"RegexID",yytext]);
        return 'identificador';
        }   
// EOF means "end of file"
<<EOF>>                return 'EOF';
// any other characters will throw an error
.       {                         
                contadorE++;
                lista_error.push([contadorE,yytext,yylloc.first_line,yylloc.first_column,"Lexico"]);
        }
//return 'INVALID'

/lex

%{  
    //EXPRESIONES
    const Aritmetica         = require('./Expresiones/Aritmetica');
    const Contador           = require('./Expresiones/Contador');
    const Identificador      = require('./Expresiones/Identificador');
    const Logica             = require('./Expresiones/Logica');
    const Parentesis         = require('./Expresiones/Parentesis');
    const Primitivo          = require('./Expresiones/Primitivo');
    const Relacional         = require('./Expresiones/Relacional');
    //INSTRUCCIONES
    const Asignacion         = require('./Instrucciones/Asignacion');
    const Break              = require('./Instrucciones/Break');
    const Call_Function      = require('./Instrucciones/Call_Function');
    const Clase              = require('./Instrucciones/Clase');
    const Comentario         = require('./Instrucciones/Comentario');
    const Continue           = require('./Instrucciones/Continue');
    const Declaracion        = require('./Instrucciones/Declaracion');
    const Do_While           = require('./Instrucciones/Do_While');
    const Excepcion          = require('./Instrucciones/Excepcion');
    const EmptyM             = require('./Instrucciones/EmptyM');
    const For                = require('./Instrucciones/For');
    const Funcion_Main       = require('./Instrucciones/Funcion_Main');
    const Funcion            = require('./Instrucciones/Funcion');
    const If                 = require('./Instrucciones/If');
    const Interface          = require('./Instrucciones/Interface');
    const Lista_ID          = require('./Instrucciones/Lista_ID');
    const Main               = require('./Instrucciones/Main');
    const Metodo             = require('./Instrucciones/Metodo');
    const Parametros         = require('./Instrucciones/Parametros');
    const Print              = require('./Instrucciones/Print');
    const Return              = require('./Instrucciones/Return');
    const While              = require('./Instrucciones/While');


%}
%start I
%% /* language grammar */

// At the top level, you explicitly return
// the result. $1 refers to the first child node,
// i.e. the "e"

I 
        :S EOF { var listaE = lista_error;
                 lista_error = [];
                 contadorE = 0;
                 var listaT = lista_tokens;
                 lista_tokens = [];
                 contadorT = 0;
                 return {ast: $1, tabla_errores: listaE,tabla_tokens:listaT};}
;

S 
        :SD {$$ = $1; }
;

SD 
        :SD CLASE_INT{$1.push($2); $$ = $1;}
        |CLASE_INT{$$ = [$1];}
;

CLASE_INT
        :r_public r_class     identificador  BLOQUE{$$ = new Clase.default($3, $4, @1.first_line, @1.first_column);}
        |r_public r_interface identificador s_llave_abre L_INSTRUCCIONES_I s_llave_cierra{$$ = new Interface.default($3, $5, @1.first_line, @1.first_column);}
        |COMENTARIO{$$ = $1;}

;

COMENTARIO
        :coment_m{$$ = new Comentario.default($1, @1.first_line, @1.first_column);}
        |coment_s{$$ = new Comentario.default($1, @1.first_line, @1.first_column);}
;

PANICO 
        :error s_pyc {
        contadorE++;
        lista_error.push([contadorE,yytext,this._$.first_line,this._$.first_column,"Sintactico"]);
                                }
        |error s_llave_cierra {
        contadorE++;
        lista_error.push([contadorE,yytext,this._$.first_line,this._$.first_column,"Sintactico"]);
        }
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
L_INSTRUCCIONES_I
        :L_INSTRUCCIONES_I INSTRUCCIONES_I{$1.push($2); $$ = $1;}
        |INSTRUCCIONES_I{$$ = [$1];}
;


L_INSTRUCCIONES_F
        :L_INSTRUCCIONES_F INSTRUCCIONES_F{$1.push($2); $$ = $1;}
        |INSTRUCCIONES_F{$$ = [$1];}
;

L_INSTRUCCIONES_M
        :L_INSTRUCCIONES_M INSTRUCCIONES_M{$1.push($2); $$ = $1;}
        |INSTRUCCIONES_M{$$ = [$1];}
;

//-------------------------------------------------------------//
INSTRUCCIONES_I
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

INSTRUCCIONES_M
        :FORD s_pyc {$$ = $1;}
        |VACIO{}
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
                :TIPO LISTAID{ $$ = new Declaracion.default($1,$2,@1.first_line, @1.first_column);}
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
;
//-------------------------------------------------------------//
METODO
        :r_public r_void identificador '('PARAMETROS')'  BLOQUE_METODO{$$ = new Metodo.default($3,$5,$7, @1.first_line, @1.first_column); }
        |r_public r_void identificador '('PARAMETROS')' s_llave_abre s_llave_cierra{$$ = new EmptyM.default($3,$5, @1.first_line, @1.first_column); }
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
        :r_public TIPO identificador '(' PARAMETROS ')' s_pyc {$$ = new Call_Function.default($2,$3,$5,@1.first_line, @1.first_column);}
        |r_public r_void identificador '(' PARAMETROS ')' s_pyc {$$ = new Call_Function.default($2,$3,$5,@1.first_line, @1.first_column);}

;
//-------------------------------------------------------------//
BLOQUE
        :s_llave_abre L_INSTRUCCIONES s_llave_cierra  {$$ = $2;}

;

BLOQUE_METODO
        :s_llave_abre L_INSTRUCCIONES_M s_llave_cierra  {$$ = $2;}

;

BLOQUE_FUNCION
        :s_llave_abre L_INSTRUCCIONES_F s_llave_cierra  {$$ = $2;}

;
//-------------------------------------------------------------//
LISTAID
        :LISTAID s_coma IDS {$1.push($3); $$ = $1; console.log("LISTAID:"+$$);}
        |IDS{$$ = [$1];}
;

IDS
        :identificador '=' E {$$ = new Lista_ID.default($1,$3,@1.first_line, @1.first_column);console.log("ID:"+$1);console.log("ID:"+$3);}
        |identificador {$$ = new Identificador.default($1, @1.first_line, @1.first_column);console.log("ID:"+$1);}
;
//-------------------------------------------------------------//
PARAMETROS
        :PARAMETROS s_coma PARAM{$1.push($3); $$ = $1;}
        |PARAM{$$ = [$1];}
;

PARAM
        :TIPO E{$$ = new Parametros.default($1,$2,@1.first_line, @1.first_column);}
        |{$$ = new Excepcion.default("VACIO",@1.first_line, @1.first_column);}
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
        :identificador s_inc{$$ = new Contador.default('++', $1,@1.first_line, @1.first_column);}
        |identificador s_dec{$$ = new Contador.default('--', $1,@1.first_line, @1.first_column);}
        |NUMBER s_inc{$$ = new Contador.default('++',$1, @1.first_line, @1.first_column);}
        |NUMBER s_dec{$$ = new Contador.default('--',$1,@1.first_line, @1.first_column);}
        
;
//-------------------------------------------------------------//
E
        :E s_mayq E2 {$$ = new Relacional.default($1, $3, '>', @1.first_line, @1.first_column);}
        |E s_menq E2 {$$ = new Relacional.default($1, $3, '<', @1.first_line, @1.first_column);}
        |E s_mayiq E2 {$$ = new Relacional.default($1, $3, '>=', @1.first_line, @1.first_column);}
        |E s_meniq E2{$$ = new Relacional.default($1, $3, '<=', @1.first_line, @1.first_column);}
        |E2 {$$ =$1}
;

E2
        :E2 s_igualdad E3 {$$ = new Relacional.default($1, $3, '==', @1.first_line, @1.first_column);}
        |E2 s_diferencia E3 {$$ = new Relacional.default($1, $3, '!=', @1.first_line, @1.first_column);}
        |E3{$$ =$1}

;

E3
        :E3 s_xor E4 {$$ = new Logica.default($1, $3, '^', @1.first_line, @1.first_column);}
        |E3 s_and E4 {$$ = new Logica.default($1, $3, '&&', @1.first_line, @1.first_column);}
        |E3 s_or  E4 {$$ = new Logica.default($1, $3, '||', @1.first_line, @1.first_column);}
        |E4 {$$ =$1}

;


E4
        :E4 s_mas   E5{$$ = new Aritmetica.default('+', @1.first_line, @1.first_column, $1, $3);}
        |E4 s_menos E5{$$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $1, $3);}
        |E5{$$ =$1}
;

E5
        :E5 s_por E6{  $$ = new Aritmetica.default('*', @1.first_line, @1.first_column, $1, $3);}
        |E5 s_div E6{  $$ = new Aritmetica.default('/', @1.first_line, @1.first_column,$1, $3);}
        |E6{$$ =$1}

;
E6
        :s_menos E7 { $$ = new Aritmetica.default('-', @1.first_line, @1.first_column, $2);}
        |s_not E7 {  $$ = new Logica.default('!', @1.first_line, @1.first_column, $2);}
        |E7 s_inc {  $$ = new Aritmetica.default('++', @1.first_line, @1.first_column, $1);}
        |E7 s_dec{  $$ = new Aritmetica.default('--', @1.first_line, @1.first_column, $1);}
        |E7{$$ =$1}

;

        
E7
        :'(' E ')'{ $$ = new Parentesis.default($1,$2,$3, @1.first_line, @1.first_column);}
        |identificador  { $$ = new Identificador.default($1, @1.first_line, @1.first_column); }
        |NUMBER{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |char{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |cadena{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |r_true{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
        |r_false{$$ = new Primitivo.default($1, @1.first_line, @1.first_column);}
;

//-------------------------------------------------------------//

