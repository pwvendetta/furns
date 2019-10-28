<?php
session_start();
$login = $_POST['login'];
$senha = $_POST['senha'];
$con =  mysqli_connect('127.0.0.1', 'root', '', 'furns');
$result = mysqli_query ($con, "SELECT * FROM `usuario` 
WHERE `conta` = '$login' AND `senha`= '$senha'");

if(mysqli_num_rows($result) > 0 )
{
  $user = mysqli_fetch_assoc($result);


$_SESSION['login'] = $login;
$_SESSION['senha'] = $senha;
$_SESSION['nickname'] = $user['nickname'];
$_SESSION['email'] = $user['email'];

if($user['idUsuario'] == 1){
  $_SESSION['admin']=true;
}else{$_SESSION['admin']=false;}


header('location:../index.php');
}
else{
  unset ($_SESSION['login']);
  unset ($_SESSION['senha']);
  unset ($_SESSION['nickname']);
  unset ($_SESSION['email']);
  header('location:../index.php?pagina=LoginRegistro');
  }

?>