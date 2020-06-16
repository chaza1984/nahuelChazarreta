



    var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
    }
  };
  

 
//let cambioPagina = document.getElementById('botonProcesar');
//cambioPagina.addEventListener("onclick", function(){window.open(www.clarin.com, '_blank');});
