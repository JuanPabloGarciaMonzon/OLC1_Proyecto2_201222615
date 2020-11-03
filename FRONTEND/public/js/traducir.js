function traducir()
{
    var btngraph = "rep_ast";
    var graph = document.getElementById("graph");
    var js = "btnjs";

    document.getElementById(btngraph).addEventListener('click',function() {
        d3.select(graph).graphviz()
        .renderDot('digraph  {a -> b}');
    
    });


    document.getElementById(js).addEventListener('click',function() {
        var hiddenElement = document.createElement('a');
      
        hiddenElement.href = 'data:attachment/text,' + encodeURI("HOLA");
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
    });


}

/*function obtenerSaludo(){
    var curso = document.getElementById("curso").value;

    fetch('../getInfo', {
        method: 'POST',
        body: JSON.stringify({"Nombre":curso}),
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => view(response));
}

function view(response){
    document.getElementById("saludo").innerHTML = response.Saludo;
    document.getElementById("curso").value = '';
}
*/