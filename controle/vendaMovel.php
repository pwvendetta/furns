<?php 
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$user=1;
$venda = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM venda ORDER BY idVenda DESC LIMIT 1"));
$idVenda= $venda['idVenda']+1;

$currentDateTime = date('Y-m-d');
$insertVenda ="insert into venda (idVenda, data, idUsuario) values ('$idVenda','$currentDateTime', '$user')";
$insVenda = mysqli_query($con,$insertVenda);
$valTotal = 0;

foreach($_POST as $idMovel => $quantidade) {

    $movel = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM movel WHERE idMovel=$idMovel"));
    $idMovel = $movel['idMovel'];
    $insert = "INSERT INTO movelvenda (idVenda, idMovel,quantidade) VALUES ('$idVenda', '$idMovel', '$quantidade')";
    $insertItemVenda = mysqli_query($con,$insert);
    $valTotal += $movel['preco'];
  }
  $update = "UPDATE `venda` SET `valor` = '$valTotal' WHERE `venda`.`idVenda` = $idVenda";
  $res = mysqli_query($con, $update);

    echo "V";
?>