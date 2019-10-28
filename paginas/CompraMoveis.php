  <div class="container">

    <div class="row text-white">
      <h1>Compra: Items</h1>
    </div>
    <!-- FILTROS -->
    <!-- <div class="container  my-2 py-2 bg-dark text-primary ">
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
    </div> -->
    <!-- FIM FILTROS -->
    <!-- TABELA SELECIONAR ITEMS  -->
    	<div class="bg-light p-3 pr-5">
      <form action="" method="post">

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
          <th>View</th>

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
        case '1':        echo "style='background-color: #c2c2c2'";        break;
        case '2':        echo "style= 'background-color:#9cfca8'" ;        break;
        case '3':        echo "style= 'background-color: #7d6ff5' ";				break;
        case '4':        echo "style= 'background-color: #e97dff' ";				break;
        case '5':        echo "style= 'background-color: #eeee77' ";			  break;      }
        $name = "item_".$movel['idMovel'];
        ?>      >
					<td style="text-align: center;">
          <input style="text-align: center;" type="number" precoItem="<?php echo $movel['preco'];?>" nomeItem="<?php echo $movel['nome'];?>" class="quantidade" iditem="<?php echo $movel['idMovel'];?>" name="<?php echo $name;?>">
          </td>
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
					<td class="text-center">
						<a href="">
            <button type='button' class='btn btn-default '> <i class="material-icons">visibility</i> </button>
						</a>
					</td>
				</tr>
				<?php endwhile; ?>
			</tbody>
		</table>

  
    </div>
    <!-- FIM TABELA DE SELECIONAR ITEMS -->
    <div class="row my-2 mx-1">

<?php if($_SESSION['logado']){
?>
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


        <div id="carrinho">
        <div class="row">
          <div class="col-sm">
            <p>Nenhum Item Adicionado</p>
          </div>
            <div class="col-sm text-center">
              <p>0</p>
            </div>
            <div class="col-sm text-right">
              <p>0</p>
            </div>
        </div>
        </div>
        

      </div>
      <!-- FIM TABELA ITEMS SELECIONADOS -->
      <!-- COMFIRMAÇÃO DE COMPRA -->
      <div class="col-sm-2-12 bg-dark ml-2 text-center text-warning">
        <div class="container">
          <p>Items: <span id="totalItens">0</span></p>
          <p>Preço: <span id="totalPreco">0 Gold</span></p>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" id="btnCalcular" type="button">Calcular</button>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white"  id="btnLimpar" type="reset">Limpar</button>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" id="btnComprar" type="button">Finalizar</button>
        </div>
      </div>
      <!-- COMFIRMAÇÃO DE COMPRA -->
    </div>
  </div>
  </form>

<?php }else{
?><h4 class="text-primary">É necessário estar logado para realizar compras</h4><?php } ?>

</div>

<script>
$(document).ready(function () {
  
  $('#btnCalcular').click(function (e) { 
    e.preventDefault();

    var totalCarrinho = 0;

    var totalItens = 0;
    $('#carrinho').html("");

    $('.quantidade').each(function(){
      
      if($(this).val() != "" && parseInt($(this).val()) > 0) {
        var total = parseInt($(this).attr("precoItem"))* parseInt($(this).val());
        var nome = $(this).attr("nomeItem");
        var quantidade = $(this).val();
        totalCarrinho = totalCarrinho+total;
        totalItens = totalItens+parseInt(quantidade);

        var html = `
        <div class="row">
          <div class="col-sm">
            <p>`+nome+`</p>
          </div>
          <div class="col-sm text-center">
            <p>`+quantidade+`</p>
          </div>
          <div class="col-sm text-right">
            <p>`+total+`</p>
          </div>
        </div>
        `;
        $('#carrinho').append(html);

        }

        $("#totalItens").text(""+totalItens);
        $("#totalPreco").text(totalCarrinho+" Gold");
    });
    
  });

  
$("#btnLimpar").click(function(){
  $('#carrinho').html(`<div class="row">
          <div class="col-sm">
            <p>Nenhum Item Adicionado</p>
          </div>
          <div class="col-sm text-center">
            <p>0</p>
          </div>
          <div class="col-sm text-right">
            <p>0</p>
          </div>
        </div>`);
        $("#totalItens").text("");
        $("#totalPreco").text("0 Gold");

});



$("#btnComprar").click(function (e) { 
  e.preventDefault();
  var itens =   "{";


  $('.quantidade').each(function(){
      
      if($(this).val() != "" && parseInt($(this).val()) > 0) {
        var nome = '"'+$(this).attr("idItem")+'" : ';
        var quantidade = '"'+$(this).val()+'", ';

        itens=itens+nome+quantidade;
        
        }
    });

    itens = itens.substring(0, itens.length - 2);

    itens= itens+"}";
    
    itens = JSON.parse(itens);
    
    $.post("controle/vendaMovel.php", itens,
      function (resp, textStatus, jqXHR) {
        alert(resp);
      },
      "text"
    );


});



});//Fim Ready




</script>