<?php
$idMovel = trim($_GET['idMovel']);
$con = conecta();
$res = mysqli_query($con, "SELECT * FROM movel WHERE idMovel=$idMovel");
$movel = mysqli_fetch_assoc($res);
 ?>
 <div class="container bg-dark pb-3">

<div class="row">
<h2 class="text-warning pl-3" >Confirmação Exclusão de Móvel</h2>
</div>
  <div class="bg-light p-3 pr-5">
<table border="0" cellpadding=0 cellspacing=0>
    <tr> <td colspan="2" align='center'> Gestão de Moveis!! </td></tr>
    <form action="?pagina=deleteMovel" method="post">
    <tr>
        <td width="80 px"> Nome: <?php echo $movel['nome'];?> </td>
    </tr>
    <tr>
        <td> Preco: <?php echo $movel['preco'];?></td>

    </tr>
    <tr align="center">
        <td>
          <input id="idMovel" name="idMovel" value="<?php echo $movel['idMovel'];?>"
          type="hidden" >
          <button type="submit">Excluir</button>
        </td>
        <td> <button type="reset">Cancelar</button> </td>
    </tr>
  </form>
</table>
</div></div>