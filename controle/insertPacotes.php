<?php
// PKG
$nome = trim($_POST['pkgnome']);
$preco = $_POST['preco'];
$imagem = trim($_POST['imagem']);
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];

$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$insert = "INSERT INTO 'pacote' ('idPacote', 'nome', 'preco', 'estilo', 'categoria', 'imagem') VALUES (NULL, '$nome', '$preco', '$estilo', '$categoria', '$imagem')";
 
$res = mysqli_query($con, $insert);

if ($res){echo "sucesso";}else{echo "falha";}
 ?>