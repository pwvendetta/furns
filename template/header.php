<!DOCTYPE html PUBLIC 
"-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html lang="pt-br" dir="ltr">
<head>
<?php if((!isset ($_SESSION['login']) == true) and (!isset ($_SESSION['senha']) == true))
{
  unset($_SESSION['login']);
  unset($_SESSION['senha']);
  $_SESSION['logado']=false;
  $_SESSION['admin']=false;
}else{ $_SESSION['logado'] = true; }
?>
<link rel="stylesheet" href="./resources/css/bootstrap.css">

    <meta charset="utf-8">
    <link rel="stylesheet" href="./resources/css/bootstrap.css">
<!-- Dropdown Galeria -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <title>Furns</title>

    <script src="./resources/js/sortElements.js"></script>
    <link rel="stylesheet" type="text/css" href="./resources/DataTables/datatables.css"/>
    <script type="text/javascript" src="./resources/DataTables/datatables.js"></script>
    <script type="text/javascript" src="./resources/DataTables/DataTables/dataTables.bootstrap.js"></script>

    <script src="https://cdn.datatables.net/buttons/1.1.0/js/dataTables.buttons.min.js"></script>
    <script src="ttps://cdn.datatables.net/select/1.1.0/js/dataTables.select.min.js"></script>

    <link href="./resources/js/imgal.min.css" rel="stylesheet">
    <script src="./resources/js/imgal.js"></script>  

    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

<script>

$(document).ready( function () {
  $('#datatable')
    .addClass( 'nowrap' )
    .dataTable( {
      responsive: true,
      columnDefs: [
        { targets: [-1, -3], className: 'dt-body-right' }
      ]
    } );
} );
</script>



<link rel="stylesheet" href="./resources/css/filter.css">



  </head>
<body class="bg-black">
