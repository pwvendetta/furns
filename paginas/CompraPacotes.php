<div class="container bg-dark">
    <div class="row">
      <h2 class="text-warning pl-3" >Compra: Pacotes</h2>

    </div>
    <div class="row">
      <h3 class="text-warning pl-3">Filtros</h3>
    </div>

    <div class="bg-light p-3">


<table class="display container" id="datatable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Style</th>
        <th>Category</th>
        <th>Price</th>
        <th>Select</th>
        <th>View</th>

      </tr>
    </thead>
    <tbody>
      <?php
      $con = conecta();
      $res = mysqli_query ($con, 'SELECT * FROM pacote');
      while ($pacote = mysqli_fetch_assoc($res)):?>
            
      <tr>
        <td>
          <?php echo $pacote['nome']; ?>
        </td>
        <td>
          <?php echo $pacote['estilo']; ?>
        </td>
        <td>
          <?php echo $pacote['categoria']; ?>
        </td>
        <td class="preco">
          <?php echo $pacote['preco']; ?>
        </td>
        <td class="text-center ">
         <input type="checkbox">
        </td>
        <td class="text-center">

        <a  href="?pagina=PacoteInfo&idPacote=<?php echo $pacote['idPacote']?>">
            <button type='button' class='btn btn-default'> <i class="material-icons">visibility</i> </button>
          </a>

        </td>

      </tr>
  </div>
      <?php endwhile; ?>
    </tbody>
    
  </table>

</div>







