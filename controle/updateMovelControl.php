<?php
$idMovel = trim($_POST['idMovel']);
$nome = trim($_POST['nome']);
$preco = $_POST['preco'];
$imagem = trim($_POST['imagem']);
$qualidade = $_POST['qualidade'];
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$subcategoria = $_POST['subcategoria'];



//Gravando os dados no BD
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$update = "update movel set nome='$nome', preco='$preco', qualidade='$qualidade', estilo='$estilo', 
categoria='$categoria', subcategoria ='$subcategoria', imagem='$imagem'  where idMovel=$idMovel";


$res = mysqli_query($con, $update);

if ($res){
  echo "Movel alterado com sucesso!";
} else {
  echo "Movel não alterado!";
}
?>