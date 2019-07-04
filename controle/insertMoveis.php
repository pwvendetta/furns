<?php
require '../libs/funcs.php';
$nome = trim($_POST['nome']);
$preço = 1000;
 // $_POST['preço'] ;
// $imagem = $_POST['imagem'];
$qualidade = 2;
// $_POST['qualidade'];
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$subcategoria = $_POST['subcategoria'];

$con = conecta();
$insert = "insert into movel (nome, preço, qualidade, estilo, categoria, subcategoria) values ('$nome', '$preço', '$qualidade', '$estilo', '$categoria', '$subcategoria')";
$res = mysqli_query($con, $insert);

if ($res){echo "sucesso";}else{echo "falha";}
 ?>
