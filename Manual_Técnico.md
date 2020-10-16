<img src="http://saesap.ingenieria.usac.edu.gt/ControlAcademico/resources/images/FACING.png" align="right" style="height: 100px"/>

# Manual Técnico - Proyecto 2
Juan Pablo García Monzon - 2012-22615

<b>Este proyecto necesita estos requerimientos para funcionar</b>

* Buscador (Chrome, Edge, etc)

* Windows 10, Linux, Mac

* NodeJS, Golang

* 1GB de RAM

* Cuenta en Docker Hub y Docker CLI

Flujo del proyecto
* Se descarga el contenedor necesario para correr las aplicaciones (goweb, nodeweb)

* Correr contenedores

* Al abrir la aplicacion dar click en el botón "Menú" y dar click en "Abrir" para poder buscar el archivo ".java" que se quiera analizar o escribir desde 0 un archivo java en el área de texto "JAVA" y luego dar click en el botón "Analizar" que esta en el botón "Menú".

* Dar click en "Menu" "Guardar" o "Guardar Como" para guardar el archivo ".java" 
* Dar click en el botón "Descargar" y elegir si descargar el analisis de "JavaScript", "Python" o ambos.
* Dar click en el botón "Reportes" para poder ver los reportes como "AST", "Lista de Tokens" o "Tabla de Errores"

![Help Builder Web Site](./Home.png)

Gramática Utilizada 

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

