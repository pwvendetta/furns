<div class="container bg-dark">
  <h2 class="text-warning">Galeria</h2>
  <!-- Linha dos filtros -->
  <h3 class="text-warning pl-3">Filtros</h3>
  <div id="buttons">
  </div>

  <div class="imgal-container" id="gallery">
    <?php
    $con = conecta();
    $res = mysqli_query ($con, 'SELECT * FROM movel');
    while ($movel = mysqli_fetch_assoc($res)):?>
    <img src="<?php echo "resources/Images/Items/".$movel['imagem'].".jpg"; ?>"  data-tags="<?php echo "EST-".$movel['estilo'].",CAT-".$movel['categoria'].",SUB-".$movel['subcategoria'];?>" alt="<?php echo $movel['nome']; ?>" class="text-primary imgal-img">
  <?php endwhile; ?>

</div>

</div>

</div>
 
<script src="resources/js/filter-tags.js"></script>
<script>
  $(document).ready(function () {
    $('.dropdown-toggle').dropdown();
  });//fim doc ready
</script>