<?php
$idmovel = trim($_POST['id']);
//Gravando os dados no BD
$con = conecta();
$delete = "delete from movel where idMovel=$idmovel";
//echo $update;
$res = mysqli_query($con, $delete);

if ($res){
    echo "Estado excluído com sucesso!!!";
  } else {
    echo "Estado não foi excluido";
  }
?>