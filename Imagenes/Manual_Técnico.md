![Help Builder Web Site](./Logo.png)

# Manual Técnico - Proyecto 2
Juan Pablo García Monzon - 2012-22615

<b>Este proyecto necesita estos requerimientos para funcionar</b>

* Buscador (Chrome, Edge, etc)

* Windows 10, Linux, Mac

* NodeJS, Golang

* 1GB de RAM

Analizador Lexico

    %lex
    options case-insensitive
    %%
    \s+                
    "//".*	

    [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

    /***PALABRAS RESERVADAS*** */
    /* tipos de datos */
    "int"   

    "double" 
              

    "char"
                 
    "boolean"
                  
    "string" 
               
    "static" 
                
    "args"
                
    "void"
                
    "main" 
                
    "if" 
                  

    "break"
                 
    "continue"
              
    "return"
              
    "else"
                
    "true" 
                   
    "false" 
                 
    "for" 
                   
    "public" 
              
    "class"
               
    "interface"
            
    "while" 
                 
    "do"
                  
    "System.out.print"
     
    "System.out.println" 
    
    /*SIMBOLOS Y SIGNOS DE COMPARACION*/
    "&&" 
	               
    "||" 
 		       
    "!=" 
 		       
    "!"
 	               
    "^" 
	              
    "<=" 
		       
    ">=" 
		       
    "==" 
		       
    "<" 
	               
    ">" 
               


    /*SIMBOLOS DE OPERACION Y ASIGNACION Y FIN DE LINEA*/
    "=" 
                 
    ";" 
                      
    "," 
                   
    ":"
                     
    "." 
                    

    '++' 
                   
    "--" 
 
    '**' 
                 
    "*" 
                  
    "/"   

    "%"                  

    "-" 
                   
    "+"                     

    "(" 
                    
    ")" 
                    
    "[" 
                   
    "]" 
                    
    "{" 
                  
    "}" 
                    
    /*ER*/
    [0-9]+("."[0-9]+)?\b 
   
    \"[^\"]*\" 
     
    \'[a-zA-Z0-9]\'  
 
    [a-zA-Z]+[a-zA-Z_0-9]*  
  
    // EOF means "end of file"
    <<EOF>>                return 'EOF';
    // any other characters will throw an error
    .  

    /lex

Gramática Utilizada 

    I 
        :S EOF 
    ;

    S 
        :SD 
        

    ;

    SD 
        :SD CLASE_INT 
        |CLASE_INT 
        
    ;

    CLASE_INT
        :r_public r_class     identificador BLOQUE
        |r_public r_interface identificador BLOQUE_I
        |r_public r_class     identificador s_llave_abre s_llave_cierra
        |r_public r_interface identificador s_llave_abre s_llave_cierra       
        |COMENTARIO 
        |PANICO  

    ;

    COMENTARIO
        :coment_m
        |coment_s
    ;

    PANICO 
        :error s_pyc 
        |error s_llave_cierra 
    ;
    //-------------------------------------------------------------------------------------------//
    L_INSTRUCCIONES
        :L_INSTRUCCIONES INSTRUCCIONES 
        |INSTRUCCIONES 
        
    ;

    L_INSTRUCCIONES_I
        :L_INSTRUCCIONES_I INSTRUCCIONES_I 
        |INSTRUCCIONES_I 
        
    ;

    L_INSTRUCCIONES_F
        :L_INSTRUCCIONES_F INSTRUCCIONES_F 
        |INSTRUCCIONES_F 
    ;

    L_INSTRUCCIONES_M
        :L_INSTRUCCIONES_M INSTRUCCIONES_M 
        |INSTRUCCIONES_M 
    ;
    //--------------------------------------------------------------------------------------------//
    INSTRUCCIONES
        :FORD s_pyc  
        |CONTADOR s_pyc  
        |PRINT s_pyc  
        |SENTENCIA_IF  
        |SENTENCIA_WHILE 
        |SENTENCIA_DOWHILE 
        |SENTENCIA_FOR 
        |BREAK 
        |CONTINUE 
        |RETURN 
        |METODO  
        |FUNCION  
        |FUNCION_MAIN  
        |CALL_F 
        |COMENTARIO 
        |PANICO                 
    ;

    INSTRUCCIONES_I
        :FORD s_pyc  
        |CONTADOR s_pyc  
        |PRINT s_pyc  
        |SENTENCIA_IF  
        |SENTENCIA_WHILE 
        |SENTENCIA_DOWHILE 
        |SENTENCIA_FOR 
        |BREAK 
        |CONTINUE 
        |CALL_F 
        |COMENTARIO 
        |PANICO 
    ;

    INSTRUCCIONES_M
        :FORD s_pyc  
        |VACIO{}
        |CONTADOR s_pyc  
        |PRINT s_pyc  
        |SENTENCIA_IF  
        |SENTENCIA_WHILE 
        |SENTENCIA_DOWHILE 
        |SENTENCIA_FOR 
        |BREAK 
        |CONTINUE 
        |CALL_F 
        |COMENTARIO 
        |PANICO 
    ;

    INSTRUCCIONES_F
        :FORD s_pyc  
        |CONTADOR s_pyc  
        |PRINT s_pyc  
        |SENTENCIA_IF  
        |SENTENCIA_WHILE 
        |SENTENCIA_DOWHILE 
        |SENTENCIA_FOR 
        |BREAK 
        |CONTINUE 
        |RETURN 
        |CALL_F 
        |COMENTARIO 
        |PANICO 
    ;
    //-------------------------------------------------------------------------------------------//
    FORD
        :DECLARACION 
        |ASIGNACION  
    ;

    DECLARACION 
        :TIPO LISTAID
    ;

    ASIGNACION 
        :identificador '=' E 
        |identificador
    ;
    //-------------------------------------------------------------------------------------------//
    SENTENCIA_IF
        : r_if '(' E ')' BLOQUE_FUNCION	
        | r_if '(' E ')' BLOQUE_FUNCION r_else BLOQUE_FUNCION
        | r_if '(' E ')' BLOQUE_FUNCION r_else SENTENCIA_IF	
        
    ;
    //-------------------------------------------------------------------------------------------//
    SENTENCIA_WHILE
        :r_while '(' E ')' BLOQUE_FUNCION 
    ;
    //-------------------------------------------------------------------------------------------//
    SENTENCIA_DOWHILE
        :r_do BLOQUE_FUNCION r_while '(' E ')' s_pyc
    ;
    //-------------------------------------------------------------------------------------------//
    SENTENCIA_FOR
        :r_for '(' FORD s_pyc E s_pyc E ')' BLOQUE_FUNCION
    ;
    //-------------------------------------------------------------------------------------------//
    BREAK
        :r_break s_pyc
    ;

    CONTINUE
        :r_continue s_pyc
    ;

    RETURN
        :r_return E s_pyc
    ;
    //--------------------------------------------------------------------------------------------//
    PRINT
        :r_print '(' E ')' 
        |r_println '(' E ')'
    ;
    //--------------------------------------------------------------------------------------------//
    METODO
        :r_public r_void identificador '('PARAMETROS')'  BLOQUE_METODO
        |r_public r_void identificador '('PARAMETROS')' s_llave_abre s_llave_cierra
    ;

    FUNCION
        :r_public TIPO identificador '(' PARAMETROS')' BLOQUE_FUNCION
        |r_public TIPO identificador '(' PARAMETROS')' s_llave_abre s_llave_cierra
    ;

    FUNCION_MAIN
        :r_public r_static r_void r_main '(' r_string '['']' r_args')' BLOQUE_FUNCION
        |r_public r_static r_void r_main '(' PARAMETROS')' BLOQUE_FUNCION
        |r_public r_static r_void r_main '(' PARAMETROS')' s_llave_abre s_llave_cierra
    ;
    //--------------------------------------------------------------------------------------------//
    CALL_F
        :r_public TIPO identificador '(' PARAMETROS ')' s_pyc 
        |r_public r_void identificador '(' PARAMETROS ')' s_pyc 
        |identificador '(' PARAMETROS ')' s_pyc 
    ;
    //--------------------------------------------------------------------------------------------//
    BLOQUE
        :s_llave_abre L_INSTRUCCIONES s_llave_cierra   
    ;

    BLOQUE_I
        :s_llave_abre L_INSTRUCCIONES_I s_llave_cierra   
    ;

    BLOQUE_METODO
        :s_llave_abre L_INSTRUCCIONES_M s_llave_cierra   
    ;

    BLOQUE_FUNCION
        :s_llave_abre L_INSTRUCCIONES_F s_llave_cierra   
    ;
    //--------------------------------------------------------------------------------------------//
    LISTAID
        :LISTAID s_coma IDS 
        |IDS
    ;

    IDS
        :identificador '=' E 
        |identificador 
    ;
    //---------------------------------------------------------------------------------------------//
    PARAMETROS
        :PARAMETROS s_coma PARAM
        |PARAM
    ;

    PARAM
        :TIPO E
        |E
        |
    ;
    //----------------------------------------------------------------------------------------------//
    TIPO
        :r_int 
        |r_char 
        |r_boolean 
        |r_double 
        |r_string
    ;
    //----------------------------------------------------------------------------------------------//
    CONTADOR
        :s_menos identificador s_inc
        |s_menos identificador s_dec
        |s_menos NUMBER s_inc
        |s_menos NUMBER s_dec
        |identificador s_inc
        |identificador s_dec
        |NUMBER s_inc
        |NUMBER s_dec        
    ;
    //---------------------------------------------------------------------------------------------//
    E
        :E s_mayq E2 
        |E s_menq E2 
        |E s_mayiq E2 
        |E s_meniq E2
        |E2 
    ;

    E2
        :E2 s_igualdad E3 
        |E2 s_diferencia E3 
        |E3
    ;

    E3
        :E3 s_xor E4 
        |E3 s_and E4 
        |E3 s_or  E4 
        |E4
    ;

    E4
        :E4 s_mas   E5
        |E4 s_menos E5
        |E5
    ;

    E5
        :E5 s_por E6
        |E5 s_residuo E6
        |E5 s_div E6
        |E5 s_exp E6
        |E6
    ;

    E6
        :s_menos E7 
        |s_not E7 
        |E7 s_inc
        |E7 s_dec
        |E7
    ;
      
    E7
        :'(' E ')'
        |identificador 
        |NUMBER
        |identificador '(' PARAMETROS ')' 
        |char
        |cadena}
        |r_true
        |r_false
    ;
    //-------------------------------------------------------------//

