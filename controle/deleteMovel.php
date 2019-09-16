<?php
$idMovel = trim($_GET['idMovel']);
//Gravando os dados no BD
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$delete = "delete from movel where idMovel=$idMovel";
//echo $update;
$res = mysqli_query($con, $delete);

if ($res){
    echo "Móvel excluído com sucesso!";
  } else {
    echo "Móvel não foi excluido!";
  }
?>