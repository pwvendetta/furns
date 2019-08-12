<div class="container bg-dark">
  <h2 class="text-warning">Alteração de Dados</h2>
  <h3 class="text-warning">Móveis</h3>

<table class="display container" id="datatable">
    <thead>
        <tr>
            <th>Qty</th>
            <th>Name</th>
            <th>Style</th>
            <th>Quality</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
  <?php
     $con = conecta();
     $res = mysqli_query ($con, 'SELECT * FROM movel');
     while ($movel = mysqli_fetch_assoc($res)):?>
         <tr>
           <td>X</td>
           <td><?php echo $movel['nome']; ?></td>
           <td><?php echo $movel['estilo']; ?></td>
           <td><?php echo $movel['qualidade']; ?></td>
           <td><?php echo $movel['categoria']; ?></td>
           <td><?php echo $movel['subcategoria']; ?></td>
           <td><?php echo $movel['preco']; ?></td>
         </tr>
    <?php endwhile; ?>

    </tbody>
</table>




  <!-- <div class="container  my-2 py-2 bg-dark text-primary datatable">
      <!-- Header -->
    <div class="row">
      <div class="col">
        <label>Qty</label>
      </div>
      <div class="col">
        <label>Name</label>
      </div>
      <div class="col">
        <label>Style</label>
      </div>
      <div class="col">
        <label>Quality</label>
      </div>
      <div class="col">
        <label>Category</label>
      </div>
      <div class="col">
        <label>Sub-Category</label>
      </div>
      <div class="col">
        <label>Price</label>
      </div>
    </div>
    <!-- Header End -->
    <!-- Data  -->

    <?php
    $con = conecta();
 $res = mysqli_query ($con, 'SELECT * FROM movel');
    while ($movel = mysqli_fetch_assoc($res)):?>
      <div class="row">
        <div class="col">
          <label>X</label>
        </div>
        <div class="col">
          <?php echo $movel['nome']; ?>
        </div>
        <div class="col">
          <?php echo $movel['estilo']; ?>
        </div>
        <div class="col">
          <?php echo $movel['qualidade']; ?>
        </div>
        <div class="col">
          <?php echo $movel['categoria']; ?>
        </div>
        <div class="col">
          <?php echo $movel['subcategoria']; ?>
        </div>
        <div class="col">
          <?php echo $movel['preco']; ?>
        </div>
      </div>
 <?php endwhile; ?>

    </div> -->
    <br>
  </div>
</div>
<script>
$(document).ready( function () {
    $('#dataTable').DataTable();
} );</script>