function traducir() 
{
    var entrada = document.getElementById('entrada');
    var graph = document.getElementById('graph');

    var data = {entrada:entrada.value}
    const Http = new XMLHttpRequest();
    Http.open("POST",`http://localhost:3000/jison`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(data));
    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText);
            var error = '';
            var token = '';
            console.log(data.traduccion);
            document.getElementById('salida').innerHTML = data.traduccion;

            console.log(data.arbol);
            d3.select(graph).graphviz()
            .renderDot(data.arbol);
            for (let er of data.error) {
                error += er;
            }
            console.log(error);

            for (let tk of data.token) {
                token += tk;
            }
            console.log(token);


        }
    }
}