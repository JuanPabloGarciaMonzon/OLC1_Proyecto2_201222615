const {Router} = require('express');
const router = Router();

const gramatica =require('../analizador/gramatica.js');
const scanner =require('../scanner/analisis_lexico.js');
const parser =require('../parser/analisis_sintactico.js');
const ast =require('../parser/recorrido_arbol');
const r_copia= require('../parser/recorrido_copia');

const arbol = require('../arboles/tabla_simbolos')
var arboles=[];

var Nodo= require('../parser/nodo_copia');

const copias= require('../arboles/comparar_copia');

router.post('/',(req,res)=>{
    //console.log(req.body);
    const{id,datos} =req.body;
    
    console.log(id);
    iniciar_analisis(id,datos);
    res.json('Archivo analizado correctamente');
   
});

//REPORTE ERRORES FORMATO JSON
router.post('/rtoken',(req,res)=>{
    const{id} =req.body;

    //var er=false;
    var ns=true;
    arboles.forEach(element => {
            
        if(element.id==id){
            ns=false;
            console.log(id);
            var prub=element.tabla_error;
            var data="[";
            var cont = 0
            prub.forEach(element => {
                data+=  JSON.stringify(element);
                cont++;
                if(cont<prub.length){
                    data+=",";
                }
                
            });
            data+="]";
            res.json(data);
        }
    });
    if(ns){
        res.json("ERROR");
    }


});




function iniciar_analisis(id,texto){
    texto=texto.substring(1,texto.length-1)
    //ANALISIS LEXICO
    scanner.iniciar(texto);
    //ANALISIS SINTACTICO
    var prub=scanner.tbl_simbolos();
    parser.iniciar(prub,scanner.tbl_errores());
    
    //REPORTES
    var a=new r_copia();
    var datos={
        valor:'',
        tipo:''
    };
    a.copias_class(parser.arbol_ast(),datos);
    //REPOTE CLASES
    //console.log(a.retornar_contenido());
    a.frep_class(a.retornar_contenido());



    //REPORTE VARIABLES
    var b=new r_copia();
    var datos1={
        valor:'',
        tipo:''
    };
    b.copias_class(parser.arbol_ast(),datos1);
    b.frep_func(b.retornar_contenido());

    
    
    /*SE VAN A GUARDAR LOS DATOS*/
    arboles.push(new arbol(id,parser.arbol_ast(),parser.tbl_errores(),a.retornar_class(),b.retornar_func(),null));

    console.log("FINALIZO EL ANALISIS");
}

router.post('/ast',(req,res)=>{
   const{id} =req.body;
   var ns=true;
   arboles.forEach(element => {
       if(element.id==id){
           ns=false;

           var a=new ast();

           res.json(a.recorrer_arbolito(element.ast));
       }
   });
   if(ns){
        res.json("No se a generado ningun AST.");
   }

});


router.post('/copia_class',(req,res)=>{
    const{id} =req.body;
    var ns=true;
    arboles.forEach(element => {
        if(element.id==id){
            ns=false;
 
            var co= new copias();
            co.fcomparar_class(arboles[0].rep_class,element.rep_class);
            res.json(co.fretornar_clases_copia());
        }
    });
    if(ns){
         res.json("No se ha analizado el Archivo.");
    }
 
 });
 

 router.post('/copia_func',(req,res)=>{
    const{id} =req.body;
    var ns=true;
    arboles.forEach(element => {
        if(element.id==id){
            ns=false;
 
            var co= new copias();
            co.fcomparar_funciones(arboles[0].rep_func,element.rep_func);
            //console.log("FUNCIONES COPIA");
            //console.log(co.fretornar_funciones_copia());
            res.json(co.fretornar_funciones_copia());
        }
    });
    if(ns){
         res.json("No se ha analizado el Archivo.");
    }
 
 });
 

 router.get('/limpiar',(req,res)=>{
  arboles=[];
  res.json("Vaciado!!!");
});
 
/*
router.get('/copia_class',(req,res)=>{
    var prub=parser.arbol_ast();
    var a=new r_copia();
    //console.log(prub.hijos[1]);
    if(prub==null){
        res.json("No se ha analizado ningún Archivo.");
    }else{
        var datos={
            valor:'',
            tipo:''
        };
        
        a.copias_class(prub,datos);
        a.frep_class(a.retornar_contenido());
        res.json("Copias Clase");
    }

});
*/

module.exports = router;


