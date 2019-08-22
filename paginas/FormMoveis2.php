<div class="container bg-dark">
	<h2 class="text-warning">Alteração de Dados</h2>
	<h3 class="text-warning">Móveis</h3>

  <div class="bg-light p-3">
	<table class="display container" id="datatable">
		<thead>
			<tr>
				<th>Qty</th>
				<th>Name</th>
				<th>Style</th>
				<th>Quality</th>
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
        ?>  style= 'background-color: #c2c2c2' <?php
          break;
        case '2':
        ?>  style= 'background-color:#9cfca8' <?php
        break;
        case '3':
        ?>  style= 'background-color: #7d6ff5' <?php
          break;
        case '4':
        ?>  style= 'background-color: #e97dff' <?php
          break;
        case '5':
        ?>  style= 'background-color: #ffe38e' <?php
          break;
      }
      ?>
      >


				<td>0</td>
				<td><?php echo $movel['nome']; ?></td>
				<td><?php echo $movel['estilo']; ?></td>
				<td><?php echo $movel['categoria']; ?></td>
				<td><?php echo $movel['subcategoria']; ?></td>
				<td class="preco"><?php echo $movel['preco']; ?></td>


			</tr>
			<?php endwhile; ?>
		</tbody>
	</table>
  </div>
<br>
</div>
</div>


<div class="bg-white" id=#myGrid></div>



<!-- <script>
	$(document).ready( function () {

    $(function () {
    $("td.preco").dblclick(function () {
        var conteudoOriginal = $(this).text();
         
        // $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='text' value='" + conteudoOriginal + "' />");
        $(this).children().first().focus();
 
        $(this).children().first().keypress(function (e) {
            if (e.which == 13) {
                var novoConteudo = $(this).val();
                $(this).parent().text(novoConteudo);
                // $(this).parent().removeClass("celulaEmEdicao");
            }
        });
         
    $(this).children().first().blur(function(){
        $(this).parent().text(conteudoOriginal);
        // $(this).parent().removeClass("celulaEmEdicao");
    });
    });
});
	});
</script> -->