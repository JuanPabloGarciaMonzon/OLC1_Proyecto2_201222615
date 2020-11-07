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

function index(pestanias, pestania) {
    var id=pestania.replace('P','');
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
        $(pestanna1).css('background','greenyellow');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cP'+id);
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
            theme: "yonce",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

function agregar() {
    try {
        var x=get_cont();
        var lu=document.getElementById("lista");
        var li=document.createElement("li");
        li.setAttribute('id','P'+x);
        var a=document.createElement("a");
        a.setAttribute('id','a'+x);
        a.setAttribute('href', 'javascript:index("pestanas","P'+x+'")');
        a.text='P'+x;
        li.appendChild(a);
        lu.appendChild(li);
        index("pestanas","P"+x);
    
        var contenido=document.getElementById("contenidopestanas");
        var divp=document.createElement("div");
        divp.setAttribute('id','cP'+x);
        var ta=document.createElement("textarea");
        ta.setAttribute('id','textarea'+x);
        ta.setAttribute('name','textarea'+x);
        ta.setAttribute('class','ta');
        ta.setAttribute('style','display:none');
        ta.cols=123;
        ta.rows=30;
        divp.appendChild(ta);
        contenido.appendChild(divp);
    
        var act=document.getElementById('cP'+x);
        var tact=document.getElementById('textarea'+x);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "yonce",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });   
    } catch (error) {
        alert("Error al añadir una pestaña");
    }

}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","P")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cP")));
        deletepes(get_vent());
    }catch(error){
        alert("Error al quitar una pestaña");
    }
}
/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    try {
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
                theme: "yonce",
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
    } catch (error) {
        alert("Algo ha sucedido a la hora de abrir su documento, vuelva a intentarlo");
        
    }

}




function saveTextAsFile()
{
    try {
        var ta=document.getElementById(get_vent());
        var textToSave=ta.value;//texto de vent actual
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

        
        var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+".java";
        if(fileNameToSaveAs == ".java"){
            alert("Si usted presiono Guardar Como necesita dar un nombre en el área de texto etiquetada que"+ 
            "esta mas abajo, si solo desea guardar de click en Guardar. Gracias");
        }
        else {
            console.log(fileNameToSaveAs);
            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = textToSaveAsURL;
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        
            downloadLink.click();  
        }
 
    } catch (error) {
        alert("No ha abierto ninguna pestaña, por favor abra una");  // display string message
        
    }

}

function saveTextFile()
{
    try {
        var ta=document.getElementById(get_vent());
        var textToSave=ta.value;//texto de vent actual
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = "Archivo.java";
    
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    
        downloadLink.click();   
    } catch (error) {
        alert("No ha abierto ninguna pestaña, por favor abra una");  // display string message
        
    }

}


function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}


function traducir()
{
    try {
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
                var errores = '';
                var contador = 0;    
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
                    var hiddenElement = document.createElement('a');      
                    hiddenElement.href = 'data:attachment/text,' + encodeURI(data.traduccion);
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'traduccionJS.java';
                    hiddenElement.click();
                });
    
                for(let er of data.error){
                    errores+="No."+er[0]+ " " +  ","+er[4]+ " " + ","+ "F:"+er[2]+ " " + ","+"C:"+er[3]+ " " + ","+"El caracter"+ " " + er[1]+ " " + "no pertenece al lenguaje"+"\n"  
                }
                document.getElementById(txtjs).value = errores;
                contador++;
                errorReport(data.error);
                tokenReport(data.token,contador)
            }
        }   
    } catch (error) {
        alert("Existe este error:"+error);
    }


}

function errorReport(lista_error) {
    // Abrir nuevo tab
    try {
        var verrores="";    
        var contador  = 0;
        var error_report = "";
        for(let er of lista_error){
            verrores+= "<tr>\n" +
            "<td"+ " " + "style="+'"color:white;"'+">"+ er[0]+"</td>\n" +
            "<td"+ " " + "style="+'"color:white;"'+">"+ er[4]+"</td>\n" +
            "<td"+ " " + "style="+'"color:white;"'+">"+ er[2]+"</td>\n" +
            "<td"+ " " + "style="+'"color:white;"'+">"+ er[3]+"</td>\n" +
            "<td"+ " " + "style="+'"color:white;"'+">"+ "El caracter"+ " " + er[1]+ " " + "no pertenece al lenguaje"+"</td>\n" +
                "</tr>\n";
        }
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
            "</table>"+
            "<br>"+"<br>"+"<br>"+"<br>";
            var btnEr="rep_error";
            document.getElementById(btnEr).addEventListener('click',function() {
                var data = error_report;           
                document.getElementById("t_error").innerHTML= data; 
            });   
    } catch (error) {
        alert("Existe este error con su reporte de errores:"+error);    
    }

}


function tokenReport(lista_token,count) {
    // Abrir nuevo tab

    try {
        var vartoken="";
        var token_report = "";
        for(let tk of lista_token){
            vartoken+= "<tr>\n" +
                "<td"+ " " + "style="+'"color:white;"'+">"+ tk[0]+"</td>\n" +
                "<td"+ " " + "style="+'"color:white;"'+">"+ tk[1]+"</td>\n" +
                "<td"+ " " + "style="+'"color:white;"'+">"+ tk[2]+"</td>\n" +
                "<td"+ " " + "style="+'"color:white;"'+">"+ tk[3]+"</td>\n" +
                "<td"+ " " + "style="+'"color:white;"'+">"+ tk[4]+"</td>\n" +
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
            "<h2>TABLA DE TOKENS" + "</h2>\n"+
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
                    document.getElementById("t_token").innerHTML= data; 
            }
            );
        
    } catch (error) {
        alert("Existe este error con su reporte de tokens:"+error);
        
    }

}






