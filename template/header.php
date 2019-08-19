<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./resources/css/bootstrap.css">
    <title>Furns</title>

    <!-- <link rel="stylesheet" type="text/css" href="resources/DataTables/dataTables.css"/> -->

    <script type="text/javascript" src="./resources/js/jquery-3.4.1.jss"></script>
    <!-- <script type="text/javascript" src="resources/DataTables-1.10.18/js/jquery.dataTables.min.js"></script> -->

    <link rel="stylesheet" type="text/css" href="./resources/DataTables/datatables.css"/>
    <script type="text/javascript" src="./resources/DataTables/datatables.js"></script>
    <script type="text/javascript" src="./resources/DataTables/DataTables/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="./resources/DataTables/Editor/js/dataTables.editor.js"></script>
    <script type="text/javascript" src="./resources/DataTables/Editor/js/editor.bootstrap.js"></script>

    <script src="https://cdn.datatables.net/buttons/1.1.0/js/dataTables.buttons.min.js"></script>
    <script src="ttps://cdn.datatables.net/select/1.1.0/js/dataTables.select.min.js"></script>

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
