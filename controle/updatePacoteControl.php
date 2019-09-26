<?php
$idPacote = trim($_POST['idPacote']);
$nome = trim($_POST['nome']);
$preco = $_POST['preco'];
$imagem = trim($_POST['imagem']);
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$conteudo = $_POST['conteudo'];


//Gravando os dados no BD
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$update = "update pacote set nome='$nome', preco='$preco', estilo='$estilo', 
categoria='$categoria', imagem='$imagem', conteudo='$conteudo'  where idPacote=$idPacote";


$res = mysqli_query($con, $update);

if ($res){
  echo "Pacote alterado com sucesso!";
} else {
  echo "Pacote não alterado!";
}
?>