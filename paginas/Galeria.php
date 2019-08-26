<html>
<body>
<div class="container bg-dark">
<h2 class="text-warning">Galeria</h2>
<!-- Linha dos filtros -->
    <div class="row">
      <h3 class="text-warning pl-3">Filtros</h3>
    </div>
    
    <div class="imgal-container">

	<?php
				$con = conecta();
				$res = mysqli_query ($con, 'SELECT * FROM movel');
				while ($movel = mysqli_fetch_assoc($res)):?>

    <img src=<?php echo $movel['imagem']; ?> weight="211px" height="180px" alt=<?php echo $movel['nome']; ?> class="imgal-img">


			<?php endwhile; ?>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT"
    crossorigin="anonymous">
    </script>
    <script src="./resource/js/imgal.js"></script>


</body>

</html>