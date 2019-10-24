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
    require 'paginas/FormPacotes.php';
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
    case 'updateMovel':
    require 'paginas/updateMovel.php';
    break;
    case 'updateMovelControl':
    require 'controle/updateMovelControl.php';
    break;
    case 'deleteMovel':
    require 'controle/deleteMovel.php';
    break;


    
    case 'deletePacote':
    require 'controle/deletePacote.php';
    break;
    case 'updatePacote':
    require 'paginas/updatePacote.php';
    break;
    case 'updatePacoteControl':
    require 'controle/updatePacoteControl.php';
    break;
case 'PacoteInfo':
require 'paginas/pacoteInfo.php';
break;

case 'LoginRegistro':
require 'paginas/loginRegistro.php';
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
