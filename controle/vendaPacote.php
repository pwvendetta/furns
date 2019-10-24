<?php 
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$user=1;
$venda = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM venda ORDER BY idVenda DESC LIMIT 1"));
$idVenda= $venda['idVenda']+1;

$currentDateTime = date('Y-m-d');
$insertVenda ="insert into venda (idVenda, data, idUsuario) values ('$idVenda','$currentDateTime', '$user')";
$insVenda = mysqli_query($con,$insertVenda);
foreach($_POST as $idPacote => $quantidade) {

    $pacote = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM pacote WHERE idPacote=$idPacote"));
    $idPacote = $pacote['idPacote'];
    $insert = "INSERT INTO pacotevenda (idVenda, idPacote,quantidade) VALUES ('$idVenda', '$idPacote', '$quantidade')";
    $insertItemVenda = mysqli_query($con,$insert);
  }
  echo "V";
?>