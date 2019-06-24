$(document).ready( function(){
  $("#formulario").submit(function (event) {
    $(".obrigatorio").each( function (){
      var valor = $(this).val();
      if(valor == ""){
        $(this).next("span").text("Campo Obrigatório");
        event.preventDefault();
      }
    });//fim do each
  });//fim do submit
} );//fim do ready
