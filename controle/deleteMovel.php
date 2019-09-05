<?php
$idMovel = trim($_GET['idMovel']);
//Gravando os dados no BD
$con = conecta();
$delete = "delete from movel where idMovel=$idMovel";
//echo $update;
$res = mysqli_query($con, $delete);

if ($res){
    echo "Móvel excluído com sucesso!";
  } else {
    echo "Móvel não foi excluido!";
  }
?>