<?php
session_start();
$idUsuario = $_SESSION['id'];
$assunto = $_POST['subject'];
$conteudo = $_POST['comments'];


$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$insert = "insert into mensagem (idUsuario, assunto, conteudo)
 values ('$idUsuario', '$assunto', '$conteudo')";
 
$res = mysqli_query($con, $insert);

var_dump($con);echo"<br><br><br>"; var_dump($insert);echo"<br><br><br>"; var_dump($res);


if ($res){echo "sucesso";}else{echo "falha";}



?>