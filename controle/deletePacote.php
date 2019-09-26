<?php
$idPacote = trim($_GET['idPacote']);
//Gravando os dados no BD
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$delete = "delete from pacote where idPacote=$idPacote";
//echo $update;
var_dump($delete);
$res = mysqli_query($con, $delete);

if ($res){
  ?> <h2 class="text-warning"> <?php echo "Pacote excluído!";?> 
  </h2><?php
  } else {
    ?> <h2 class="text-warning"> <?php echo "Pacote não excluído!";?> 
    </h2><?php  }
?>

<div class="col-sm-1-12">
        <a href="?pagina=FormMoveis">  <button type="button" class="btn btn-primary">Retornar</button></a>
        </div>