<?php
$idPacote = trim($_GET['idPacote']);
$con = conecta();  
$res = mysqli_query($con, "SELECT * FROM pacote WHERE idPacote=$idPacote");
$pacote = mysqli_fetch_assoc($res);?>
<div class="container bg-dark pb-3">
	<h2 class="text-warning"><?php echo $pacote['nome']?></h2>
    <div class="row">
    <div class="col">    <p>Preço: <?php echo $pacote['preco'] ?></p></div>
    <div class="col"><p>Estilo: <?php echo $pacote['estilo'] ?></p></div>
    <div class="col"><p>Categoria: <?php echo $pacote['categoria'] ?></p></div></div>
    <div class="row"><div class="col">
    <p>Conteúdo: <?php echo $pacote['conteudo'] ?></p></div></div>
    <div class="row"><div class="col">
    <img src="<?php echo $pacote['imagem']?>" alt="Image not Found" style="max-width:100%"></div></div>


</div>