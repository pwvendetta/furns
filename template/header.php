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
