<?php
$idMovel = trim($_GET['idMovel']);
$con = conecta();
$res = mysqli_query($con, "SELECT * FROM movel WHERE idMovel=$idMovel");
$movel = mysqli_fetch_assoc($res);
 ?>
<table border="0" cellpadding=0 cellspacing=0>
    <tr> <td colspan="2" align='center'> Update </td></tr>
    <form action="?pagina=updateMovelControl" method="post">
    <tr>
        <td width="80 px"> Nome: </td>
        <td> <input id="nome" name="nome" type="text"
             value="<?php echo $movel['nome'];?>" required> </td>
    </tr>
    <tr>
        <td width="80 px"> Preço: </td>
        <td> <input id="preco" name="preco" type="number"
             value="<?php echo $movel['preco'];?>" required> </td>
    </tr>
    <tr>
        <td width="80 px"> Estilo: </td>
        <td> 
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
     </td>
    </tr>
    <tr>
        <td width="80 px"> Categoria: </td>
        <td> 
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
         </td>
    </tr>
    
    <tr>
        <td width="80 px"> Qualidade: </td>
        <td> 
        <select name="qualidade" class="form-control">
      <option value="">Qualidade</option>
      <option value="1">Normal</option>
      <option value="2" class="text-success">Fine</option>
      <option value="3" class="text-primary">Superior</option>
      <option value="4" style="color: #aa00ff">Epic</option>
      <option value="5" class="text-warning">Legendary</option>
    </select>
         </td>
    </tr>

    <tr>
        <td width="80 px"> Imagem: </td>
        <td> <input id="imagem" name="imagem" type="text"
             value="<?php echo $movel['Imagem'];?>" required> </td>
    </tr>




    <tr align="center">
        <td>
          <input id="idest" name="idest" value="<?php echo $estado['idest'];?>"
          type="hidden" >
          <button type="submit">Salvar</button>
        </td>
        <td> <button type="reset">Cancelar</button> </td>
    </tr>
  </form>
</table>
