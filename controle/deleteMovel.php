<?php
$idMovel = trim($_GET['idMovel']);
//Gravando os dados no BD
$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
$delete = "delete from movel where idMovel=$idMovel";
//echo $update;
$res = mysqli_query($con, $delete);

if ($res){
  ?> <h2 class="text-warning"> <?php echo "Móvel excluído!";?> 
  </h2><?php
  } else {
    ?> <h2 class="text-warning"> <?php echo "Móvel não excluído!";?> 
    </h2><?php  }
?>

<div class="col-sm-1-12">
        <a href="?pagina=FormMoveis">  <button type="button" class="btn btn-primary">Retornar</button></a>
        </div>