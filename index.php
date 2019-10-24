<?php
session_start();

$get = isset($_GET['pagina'])?$_GET['pagina']:'';
require 'libs/funcs.php';
// require 'libs/configs.php';
require 'template/header.php';
require 'template/menu.php';
  navega($get);

require 'template/footer.php';
?>
