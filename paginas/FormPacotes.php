  
<div class="container bg-dark">
	<h2 class="text-warning">Alteração de Dados</h2>
	<h3 class="text-warning">Pacotes</h3>


	<div class="bg-light p-3">


	<table class="display container" id="datatable">
			<thead>
				<tr>
					<th>Name</th>
					<th>Style</th>
					<th>Category</th>
					<th>Price</th>
					<th>Edit</th>
					<th>Delete</th>
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
					<td class="text-center">
					<a href="?pagina=updatePacote&idPacote=<?php echo $pacote['idPacote'];?> ">
							<button type='button' class='btn btn-default '> <i class="material-icons">create</i></button>
						</a>
					</td>
					<td class="text-center">
						<a href="?pagina=deletePacote&idPacote=
							<?php echo $pacote['idPacote'];?> ">
							<button type='button' class='btn btn-default '> <i class="material-icons">clear</i> </button>
						</a>
					</td>
					<td class="text-center">
					<a  href="?pagina=PacoteInfo&idPacote=<?php echo $pacote['idPacote']?>">
							<button type='button' class='btn btn-default '> <i class="material-icons">visibility</i> </button>
						</a>

					</td>

				</tr>
				<?php endwhile; ?>
			</tbody>
		</table>

</div>









<br><hr class="bg-warning">

	<form class="bg-dark p-2" action="./controle/insertPacotes.php" method="post" id="formulario">
		<label class="text-light">Nome: </label>
		<input type="text" name="pkgnome" value="" class="form-control obrigatorio">
			<span class="text-danger"></span>
			<br>
				<label class="text-light">Preço: </label>
				<input type="number" name="preco" value="" class="form-control">
					<br>
						<label class="text-light">Imagem </label>
						<input type="text" name="imagem" value="" class="form-control">
						<br>
								<select name="estilo" class="form-control">
									<option value="">Estilo</option>
									<option value="	Argonian	">	Argonian	</option>
									<option value="	Breton	">	Breton	</option>
									<option value="	Dark Elf	">	Dark Elf	</option>
									<option value="	High Elf	">	High Elf	</option>
									<option value="	Khajiit	">	Khajiit	</option>
									<option value="	Nord	">	Nord	</option>
									<option value="	Orcish	">	Orcish	</option>
									<option value="	Redguard	">	Redguard	</option>
									<option value="	Imperial	">	Imperial	</option>
									<option value="	Common	">	Common	</option>
									<option value="	Rough	">	Rough	</option>
									<option value="	Daedric	">	Daedric	</option>
									<option value="	Clockwork	">	Clockwork	</option>
									<option value="	Dwarven	">	Dwarven	</option>
									<option value="	Fabricant	">	Fabricant	</option>
									<option value="	Dres	">	Dres	</option>
									<option value="	Hlaalu	">	Hlaalu	</option>
									<option value="	Indoril	">	Indoril	</option>
									<option value="	Redoran	">	Redoran	</option>
									<option value="	Telvanni	">	Telvanni	</option>
									<option value="	Alinor	">	Alinor	</option>
									<option value="	Murkmire	">	Murkmire	</option>
									<option value="	Elsweyr	">	Elsweyr	</option>
									<option value="	Hakoshae	">	Hakoshae	</option>
									<option value="	Ashlander	">	Ashlander	</option>
									<option value="	Jester	">	Jester	</option>
									<option value="	Velothi	">	Velothi	</option>
								</select>
								<br>
									<select name="categoria" class="form-control">
										<option value="">Categoria</option>
										<option value="	Conservatory	">	Conservatory	</option>
										<option value="Courtyard">	Courtyard	</option>
										<option value="Hearth">	Hearth	</option>
										<option value="Dining">	Dining	</option>
										<option value="Gallery">	Gallery	</option>
										<option value="Library">	Library	</option>
										<option value="Lighting">	Lighting	</option>
										<option value="Miscellaneous">	Miscellaneous	</option>
										<option value="Parlor">	Parlor	</option>
										<option value="Services">	Services	</option>
										<option value="Suite">	Suite	</option>
										<option value="Undercroft">	Undercroft	</option>
										<option value="Workshop">	Workshop	</option>
									</select>
									<br>
										<hr class="bg-warning">
											<h4 class="text-warning">Conteúdo:</h4>
											<!-- <button type="button" class="btn btn-primary add_field_button">ADD</button> -->
											<div class=" p-3">
												<textarea name="conteudo" style="width:100%">CONTEUDO</textarea>
												<!-- <div class="input_fields_wrap"></div> -->
											</div>
											<hr class="bg-warning">
												<div class="row">
													<div class="col-md text-center">
														<input type="submit" name="" value="Cadastrar" class="form-control bg-warning border-warning">
															<br>
															</div>
														</div>
													</form>
												</div>
											</div>
											<!-- <script>
      $(document).ready(function() {
	var max_fields      = 30; //maximum input boxes allowed
	var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
	var add_button      = $(".add_field_button"); //Add button ID
	
	var x = 1; //initlal text box count
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(x < max_fields){ //max input box allowed
			x++; //text box increment
			$(wrapper).append(
"<div class='row border border-black py-2 rounded-sm'><div class='col-md-1 p-0 m-0'><input type='number' name='qty[]' value='' class='p-0 m-0 form-control'></div><div class='col-md p-0 m-0'><input type='text' name='itemName[]' value='' class='p-0 m-0 form-control'></div><button type='button' class='btn btn-primary remove_field'>X</button></div>"
      
      ); //add input box
		}
	});
	
	$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
		e.preventDefault(); $(this).parent('div').remove(); x--;
	})
});
</script> -->