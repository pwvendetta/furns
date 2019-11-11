<div class="container bg-dark">
    <div class="row">
      <h2 class="text-warning pl-3" >Compra: Pacotes</h2>

    </div>
    <div class="row">
      <h3 class="text-warning pl-3">Filtros</h3>
    </div>

    <div class="bg-light p-3">

    <form action="" method="post">

<table class="display container" id="datatable">
    <thead>
      <tr>
        <th>Quantity</th>
        <th>Name</th>
        <th>Style</th>
        <th>Category</th>
        <th>Price</th>
        <th>View</th>

      </tr>
    </thead>
    <tbody>
      <?php
      $con = conecta();
      $res = mysqli_query ($con, 'SELECT * FROM pacote');
      while ($pacote = mysqli_fetch_assoc($res)):
        $name = "item_".$pacote['idPacote'];
        ?>
            
      <tr>
	  <td style="text-align: center;">
          <input style="text-align: center;" type="number" precoItem="<?php echo $pacote['preco'];?>"
		  nomeItem="<?php echo $pacote['nome'];?>" class="quantidade" idItem="<?php echo $pacote['idPacote'];?>" name="<?php echo $name;?>">
          </td>
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
        alert("asdf");
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

        }else{  $('#carrinho').html(`<div class="row">
          <div class="col-sm">
            <p>Nenhum Item Adicionado</p>
          </div>
          <div class="col-sm text-center">
            <p>0</p>
          </div>
          <div class="col-sm text-right">
            <p>0</p>
          </div>
        </div>`);}

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
        $("#totalItens").text("0");
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
    
    $.post("controle/vendaPacote.php", itens,
      function (resp, textStatus, jqXHR) {
        alert(resp);
      },
      "text"
    );


});



});//Fim Ready




</script>