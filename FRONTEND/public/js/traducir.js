function traducir()
{
    var graph = document.getElementById("graph");
    var js = "btnjs";
    d3.select(graph).graphviz()
    .renderDot('digraph  {a -> b}');
    document.getElementById(js).addEventListener('click',function() {
        var hiddenElement = document.createElement('a');
      
        hiddenElement.href = 'data:attachment/text,' + encodeURI("HOLA");
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
    });


}
