<?php
$con = conecta();
// $res = mysqli_query ($con, 'SELECT * FROM movel');

 ?>
  <div class="container bg-dark">
    <h2 class="text-warning">Alteração de Dados</h2>
    <h3 class="text-warning">Móveis</h3>

    <div id="formMoveis">
      <form class="bg-dark p-2" action="controle/insertMoveis.php" method="post" id="formulario">

        <label class="text-light">Nome: </label> <input type="text" name="nome" value="" class="form-control obrigatorio">
        <span class="text-danger"></span>
        <br>
        <label class="text-light">Preço: </label> <input type="number" name="preco" value="" class="form-control"><br>

        <label class="text-light">Imagem </label> <input type="text" name="imagem" value="" class="form-control"><br>
        <br>

        <div class="row">
          <div class="col-md">
            <select name="qualidade" class="form-control obrigatorio">
              <option value="">Qualidade</option>
              <option value="1">Normal</option>
              <option value="2" class="text-success">Fine</option>
              <option value="3" class="text-primary">Superior</option>
              <option value="4" style="color: #aa00ff">Epic</option>
              <option value="5" class="text-warning">Legendary</option>
            </select>
            <span class="text-danger"></span>
          </div>

          <div class="col-md">
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

          </div>
          <div class="col-md">
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
          </div>

          <div class="col-md">
            <select name="subcategoria" class="form-control">
              <option value="">Sub-Categoria</option>
                <!-- https://eso.mmo-fashion.com/furnishings-by-type/ -->
            </select>
          </div>
        </div>
        <br><hr class="bg-warning">
        <div class="row">
          <div class="col-md">
            <input type="submit" name="" value="Cadastrar" class="form-control bg-warning border-warning">
          </div>
          <div class="col-md">
            <input type="submit" name="" value="Alterar"  class="form-control bg-warning border-warning">
          </div>
          <div class="col-md">
            <input type="submit" name="" value="Excluir"  class="form-control bg-warning border-warning">
          </div>
        </div>

      </form>
      <br>
    </div>    </div>
