<?php
require '../libs/funcs.php';
$nome = trim($_POST['nome']);
<<<<<<< HEAD
$preco = $_POST['preco'];
$imagem = $_POST['imagem'];
=======
$preço = $_POST['preco'];
$imagem = trim($_POST['imagem']);
>>>>>>> ef09501d79a9de27a7495a66d8204e6227d74d7a
$qualidade = $_POST['qualidade'];
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$subcategoria = $_POST['subcategoria'];

$con = conecta();
<<<<<<< HEAD
$insert = "insert into movel (nome, preco, qualidade, estilo, categoria, subcategoria, imagem) values ('$nome', '$preco', '$qualidade', '$estilo', '$categoria', '$subcategoria', '$imagem')";
=======
$insert = "insert into movel (nome, preco, qualidade, estilo, categoria, subcategoria, imagem)
 values ('$nome', '$preço', '$qualidade', '$estilo', '$categoria', '$subcategoria', '$imagem')";
>>>>>>> ef09501d79a9de27a7495a66d8204e6227d74d7a
$res = mysqli_query($con, $insert);

if ($res){echo "sucesso";}else{echo "falha";}
 ?>
