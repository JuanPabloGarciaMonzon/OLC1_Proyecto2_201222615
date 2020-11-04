var contador=0;



function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=123;
    ta.rows=30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}
/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".java";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}


function traducir()
{
    var ta=document.getElementById(get_vent());
    var data = {entrada:ta.value}
    const Http = new XMLHttpRequest();
    Http.open("POST",`http://localhost:3000/jison`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(data));


    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText);
            var verrores = '';
            
    
            var btngraph = "rep_ast";
            var txtjs = "txt_js";
            var graph = document.getElementById("graph");
            var js = "btnjs";
            document.getElementById(btngraph).addEventListener('click',function() {
                d3.select(graph).graphviz()
                
                .renderDot(data.arbol);
            
            });
        
        
            document.getElementById(js).addEventListener('click',function() {
                var ta=document.getElementById(get_vent());
                var contenido=ta.value;//texto de vent actual
                var hiddenElement = document.createElement('a');      
                hiddenElement.href = 'data:attachment/text,' + encodeURI(data.traduccion);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'myFile.txt';
                hiddenElement.click();
            });


            for(let er of data.error){
                verrores+=er[0]+","+er[4]+","+er[2]+","+er[3]+","+"El caracter"+ " " + er[1]+ " " + "no pertenece al lenguaje"+"\n"  
            }
            document.getElementById(txtjs).value = verrores;
            
            errorReport(data.error);
            tokenReport(data.token)
        }
    }

}

function errorReport(lista_error) {
    // Abrir nuevo tab
    var verrores="";
    
    var error_report = "";
    for(let er of lista_error){
        verrores+= "<tr>\n" +
            "<td>"+ er[0]+"</td>\n" +
            "<td>"+ er[4]+"</td>\n" +
            "<td>"+ er[2]+"</td>\n" +
            "<td>"+ er[3]+"</td>\n" +
            "<td>"+ "El caracter"+ " " + er[1]+ " " + "no pertenece al lenguaje"+"</td>\n" +
            "</tr>\n";
    }

    // Cambiar el foco al nuevo tab (punto opcional)
    error_report = "<style>\n" +
        "table {\n" +
        "font-family: arial, sans-serif;\n" +
        "border: 1px solid #dddddd;\n" +
        "width: 100%;\n" +
        "}\n" +
        "td, th {\n" +
        "border: 1px solid #dddddd;\n" +
        "text-align: left;\n" +
        "padding: 8px;\n" +
        "}\n" +
        "th{\n" +
        "background-color:#2196F3;\n" +
        "color: white;\n" +
        "}\n" +
        "</style>" +
        "<h2>TABLA DE ERRORES</h2>\n" +
        "<table>\n" +
        "<tr>\n" +
        "<th>NO.</th>\n" +
        "<th>TIPO</th>\n" +        
        "<th>FILA</th>\n" +
        "<th>COLUMNA</th>\n" +
        "<th>DESCRIPCION</th>\n" +
        "</tr>\n" +
        verrores +
        "</table>";


        var btnEr="rep_error";
        document.getElementById(btnEr).addEventListener('click',function() {
            var data = error_report;
            var myWindow = window.open("", "MsgWindow", "width=1447.500,height=2075.340");
            myWindow.document.write(data);
            error_report = "";
        });
}


function tokenReport(lista_token) {
    // Abrir nuevo tab
    var vartoken="";
    var token_report = "";
    for(let tk of lista_token){
        vartoken+= "<tr>\n" +
            "<td>"+ tk[0]+"</td>\n" +
            "<td>"+ tk[1]+"</td>\n" +
            "<td>"+ tk[2]+"</td>\n" +
            "<td>"+ tk[3]+"</td>\n" +
            "<td>"+ tk[4]+"</td>\n" +
            "</tr>\n";
    }
    // Cambiar el foco al nuevo tab (punto opcional)
    token_report = "<style>\n" +
        "table {\n" +
        "font-family: arial, sans-serif;\n" +
        "border: 1px solid #dddddd;\n" +
        "width: 100%;\n" +
        "}\n" +
        "td, th {\n" +
        "border: 1px solid #dddddd;\n" +
        "text-align: left;\n" +
        "padding: 8px;\n" +
        "}\n" +
        "th{\n" +
        "background-color:#2196F3;\n" +
        "color: white;\n" +
        "}\n" +
        "</style>" +
        "<h2>TABLA DE TOKENS</h2>\n" +
        "<table>\n" +
        "<tr>\n" +
        "<th>NO.</th>\n" +        
        "<th>FILA</th>\n" +
        "<th>COLUMNA</th>\n" +
        "<th>TIPO</th>\n" +
        "<th>DESCRIPCION</th>\n" +
        "</tr>\n" +
        vartoken +
        "</table>";


        var btnTk="rep_tk";
        document.getElementById(btnTk).addEventListener('click',function() {
            var data = token_report;
            token_report = "";
            var myWindow = window.open("", "TkWindow", "width=1447.500,height=2075.340");
            myWindow.document.write(data);
            

        });

}






