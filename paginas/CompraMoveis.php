  <div class="container">

    <div class="row text-white">
      <h1>Compra: Items</h1>
    </div>
    <!-- FILTROS -->
    <div class="container  my-2 py-2 bg-dark text-primary ">
      <h5>Filtros:</h5>
      <div class="row">
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Estilos
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categoria
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Subcategoria
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Qualidade
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Preço
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search
            </a>
          </div>
        </div>

      </div>
    </div>
    <!-- FIM FILTROS -->
    <!-- TABELA SELECIONAR ITEMS  -->
    	<div class="bg-light p-3 pr-5">

    <table class="display container" id="datatable">
			<thead>
				<tr>
					<!-- <th>Qty</th> -->
          <th>Qty</th>
					<th>Name</th>
					<th>Style</th>
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
				<tr
        
					<?php
      
      switch ($movel['qualidade']) {
        case '1':
        ?>  style= 'background-color: #c2c2c2' 
					<?php
          break;
        case '2':
        ?>  style= 'background-color:#9cfca8' 
					<?php
        break;
        case '3':
        ?>  style= 'background-color: #7d6ff5' 
					<?php
          break;
        case '4':
        ?>  style= 'background-color: #e97dff' 
					<?php
          break;
        case '5':
        ?>  style= 'background-color: #eeee77' 
					<?php
          break;
      }
      ?>
      >
					<td style="text-align: center;"><input style="text-align: center;" type="number"></td>
					<td>
						<?php echo $movel['nome']; ?>
					</td>
					<td>
						<?php echo $movel['estilo']; ?>
					</td>
					<td>
						<?php echo $movel['categoria']; ?>
					</td>
					<td>
						<?php echo $movel['subcategoria']; ?>
					</td>
					<td class="preco">
						<?php echo $movel['preco']; ?>
					</td>

				</tr>
				<?php endwhile; ?>
			</tbody>
		</table>
    </div>
    <!-- FIM TABELA DE SELECIONAR ITEMS -->
    <div class="row my-2 mx-1">
      <!-- TABELA ITEMS SELECIONADOS -->
      <div class="col-lg md-5 bg-dark text-white py-2 mr-0">

        <div class="row text-primary">
          <div class="col-sm pl-3">
            <p>Item</p>
          </div>
          <div class="col-sm text-center">
            <p>QTY</p>
          </div>
          <div class="col-sm text-right">
            <p>PREÇO</p>
          </div>
        </div>


        <div class="row">
          <div class="col-sm">
            <p>Clockwork Chair, Practical</p>
          </div>
          <div class="col-sm text-center">
            <p>3</p>
          </div>
          <div class="col-sm text-right">
            <p>6400</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <p>Clockwork Stool, Practical</p>
          </div>
          <div class="col-sm text-center">
            <p>2</p>
          </div>
          <div class="col-sm text-right">
            <p>3200</p>
          </div>
        </div>

      </div>
      <!-- FIM TABELA ITEMS SELECIONADOS -->
      <!-- COMFIRMAÇÃO DE COMPRA -->
      <div class="col-sm-2-12 bg-dark ml-2 text-center text-warning">
        <div class="container">
          <p>Items: 5</p>
          <p>Preço: 9600</p>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" type="submit">Comprar</button>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" type="submit">Limpar</button>
        </div>
      </div>
      <!-- COMFIRMAÇÃO DE COMPRA -->
    </div>
  </div>
<!--












</body>




</html> -->
