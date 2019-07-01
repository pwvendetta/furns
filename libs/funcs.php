<?php
function navega($pagina){
  switch ($pagina) {
    case 'CompraMoveis':
    require 'paginas/CompraMoveis.php';
    break;
    case 'CompraPacotes':
    require 'paginas/CompraPacotes.php';
    break;
    default:
    require 'paginas/Inicio.php';
    break;
  }
}

function conecta() {
  return mysqli_connect(HOST,USER,PASS,BANCO);
}



?>
