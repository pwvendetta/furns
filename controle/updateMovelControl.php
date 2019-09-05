<?php
require '../libs/funcs.php';
$nome = trim($_POST['nome']);
$preço = $_POST['preco'];
$imagem = trim($_POST['imagem']);
$qualidade = $_POST['qualidade'];
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$subcategoria = $_POST['subcategoria'];

$con = conecta();
$insert = "insert into movel (nome, preco, qualidade, estilo, categoria, subcategoria, imagem)
 values ('$nome', '$preço', '$qualidade', '$estilo', '$categoria', '$subcategoria', '$imagem')";
$res = mysqli_query($con, $insert);

if ($res){echo "sucesso";}else{echo "falha";}
 ?>
