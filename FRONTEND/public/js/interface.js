function myFunction() {
    alert("hola mundo");
}

function cambiar(){
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = "";

    var pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
    document.getElementById('file-upload')
        .addEventListener('change', leerArchivo, false);

}


function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

function input_changed(obj_txt)
    {
        obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea')[0];
        cntline = count_lines(obj_txt.value);
        if(cntline == 0) cntline = 1;
        tmp_arr = obj_rownr.value.split('\n');
        cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10);
        // if there was a change in line count
        if(cntline != cntline_old)
        {
            obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
            populate_rownr(obj_rownr, cntline);
            scroll_changed(obj_txt);
        }
        selectionchanged(obj_txt);
    }

    function scroll_changed(obj_txt)
    {
        obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea')[0];
        scrollsync(obj_txt,obj_rownr);
    }
    
function scrollsync(obj1, obj2)
    {
        // scroll text in object id1 the same as object id2
        obj2.scrollTop = obj1.scrollTop;
    }

    function selectionchanged(obj)
{
    var substr = obj.value.substring(0,obj.selectionStart).split('\n');
    var row = substr.length;
    var col = substr[substr.length-1].length;
    var tmpstr = '(' + row.toString() + ',' + col.toString() + ')';
    // if selection spans over
    if(obj.selectionStart != obj.selectionEnd)
    {
        substr = obj.value.substring(obj.selectionStart, obj.selectionEnd).split('\n');
        row += substr.length - 1;
        col = substr[substr.length-1].length;
        tmpstr += ' - (' + row.toString() + ',' + col.toString() + ')';
    }
    obj.parentElement.getElementsByTagName('input')[0].value = tmpstr;
}

function keyup(obj, e)
{
        if(e.keyCode >= 33 && e.keyCode <= 40) // arrows ; home ; end ; page up/down
            selectionchanged(obj, e.keyCode);
}