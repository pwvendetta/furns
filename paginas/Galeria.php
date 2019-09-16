<div class="container bg-dark">
<h2 class="text-warning">Galeria</h2>
<!-- Linha dos filtros -->
    <div class="row">
      <h3 class="text-warning pl-3">Filtros</h3>
    </div>
    
    <div class="imgal-container">

	<?php
				$con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
				$res = mysqli_query ($con, 'SELECT * FROM movel');
				while ($movel = mysqli_fetch_assoc($res)):?>
    <img src="<?php echo $movel['imagem']; ?>"  alt="<?php echo $movel['nome']; ?>" class="imgal-img">

			<?php endwhile; ?>

    </div>

    </div>

    </div>