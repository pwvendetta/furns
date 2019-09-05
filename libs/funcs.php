<?php
function navega($pagina){
  switch ($pagina) {
    case 'CompraMoveis':
    require 'paginas/CompraMoveis.php';
    break;
    case 'CompraPacotes':
    require 'paginas/CompraPacotes.php';
    break;
    case 'FormMoveis':
    require 'paginas/FormMoveis2.php';
    break;
    case 'FormPacotes':
    require 'paginas/FormMoveis.php';
    break;
    case 'Galeria':
    require 'paginas/Galeria.php';
    break;
    case 'Contato':
    require 'paginas/Contato.php';
    break;
    case 'insertMoveis':
    require 'controle/insertMoveis.php';
    break;
    case 'updateMoveis':
    require 'controle/updateMoveis.php';
    break;
    case 'deleteMovel':
    require 'controle/deleteMovel.php';
    break;
    default:
    require 'paginas/Inicio.php';
    break;
  }
}

function conecta() {
  return mysqli_connect('127.0.0.1', 'root', '', 'furns');
}



?>
