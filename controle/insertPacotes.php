<?php
// PKG
$nome = trim($_POST['pkgnome']);
$preco = $_POST['preco'];
$imagem = trim($_POST['imagem']);
$estilo = $_POST['estilo'];
$categoria = $_POST['categoria'];
$conteudo = $_POST['conteudo'];



$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');


$insert = "INSERT INTO pacote (idPacote, nome, preco, estilo, categoria, imagem, conteudo) 
VALUES (NULL, '$nome', '$preco', '$estilo', '$categoria', '$imagem', '$conteudo')";


$res = mysqli_query($con, $insert);



if ($res){echo "<h3 class='text-warning'>sucesso</h3>";}else{echo "<h3 class='text-warning'>falha</h3>";}



?>