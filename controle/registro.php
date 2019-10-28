<?php 
$conta = $_POST['login'];
$senha = $_POST['senha'];
$email = $_POST['email'];
$nickname = $_POST['nickname'];

$con =  mysqli_connect('127.0.0.1', 'root', '', 'furns');

$insert = "INSERT INTO `usuario` (`idUsuario`, `conta`, `senha`, `nickname`, `email`)
VALUES (NULL, '$conta', '$senha', '$nickname', '$email')";
 
$res = mysqli_query($con, $insert);

if ($res){
    echo "Sucesso";

    time_nanosleep(5,0);

    header('location:../index.php');
}else{
    echo "falha";
    time_nanosleep(5,0);
    header('location:../index.php?pagina=LoginRegistro');

}
 ?>
