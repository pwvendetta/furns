<?php 
$con =  mysqli_connect('127.0.0.1', 'root', '', 'furns');

$idVenda = $_POST['idVenda'];

$select = "SELECT `idVenda`,`concluido` FROM `venda` WHERE `idVenda` = $idVenda";
$res = mysqli_query($con, $select);
$venda = mysqli_fetch_assoc($res);
if($venda['concluido'] == 0 || $venda['concluido'] == NULL){$update = "UPDATE `venda` SET `concluido` = '1' WHERE `venda`.`idVenda` = $idVenda";
}else{$update = "UPDATE `venda` SET `concluido` = '0' WHERE `venda`.`idVenda` = $idVenda";}

$res2 = mysqli_query($con, $update);

if ($res2){
    header('location:../index.php?pagina=RelVendaMoveis');
} else {
    header('location:../index.php?pagina=RelVendaMoveis');
}
// var_dump($con); echo "<br><br><br><br>";
// var_dump($idVenda); echo "<br><br><br><br>";
// var_dump($select); echo "<br><br><br><br>";
// var_dump($res); echo "<br><br><br><br>";
// var_dump($venda); echo "<br><br><br><br>";
// var_dump($update); echo "<br><br><br><br>";
// var_dump($res2); echo "<br><br><br><br>";
?>