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

    <meta charset="utf-8">


    <link rel="stylesheet" href="./resources/css/bootstrap.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <title>Furns</title>

    <!-- <link rel="stylesheet" type="text/css" href="resources/DataTables/dataTables.css"/> -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

    <!-- <script type="text/javascript" src="./resources/js/jquery-3.4.1.jss"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->

    <!-- <script type="text/javascript" src="resources/DataTables-1.10.18/js/jquery.dataTables.min.js"></script> -->

    <link rel="stylesheet" type="text/css" href="./resources/DataTables/datatables.css"/>
    <script type="text/javascript" src="./resources/DataTables/datatables.js"></script>
    <script type="text/javascript" src="./resources/DataTables/DataTables/dataTables.bootstrap.js"></script>
    <!-- <script type="text/javascript" src="./resources/DataTables/Editor/js/dataTables.editor.js"></script>
    <script type="text/javascript" src="./resources/DataTables/Editor/js/editor.bootstrap.js"></script> -->

    <script src="https://cdn.datatables.net/buttons/1.1.0/js/dataTables.buttons.min.js"></script>
    <script src="ttps://cdn.datatables.net/select/1.1.0/js/dataTables.select.min.js"></script>

    <script src="./resources/Daragrid/src/quickgrid.js"></script>

    <link href="./resources/js/imgal.min.css" rel="stylesheet">
    <script src="./resources/js/imgal.js"></script>  
<!-- modal -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />



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

  </head>
<body class="bg-black">
