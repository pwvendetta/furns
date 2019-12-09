<?php if(!$_SESSION['logado']){?><h4 class="text-primary">É necessário ser o administrador para visualizar os relatorios</h4>
<?php }else{
?>
<div class="container bg-dark pb-3">
    <div class="row">
    <h2 class="text-warning pl-3" >Relatório de Vendas de Móveis</h2>
    </div>
    	<div class="bg-light p-3 pr-5">

        
        <table class="display container" id="">
                <thead>
                    <tr>
                        <th class="m-2 p-2">Usuario</th>
                        <th class="m-2 p-2">Assunto</th>
                        <th class="m-2 p-2">Mensagem</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $con = conecta();
                    $resM = mysqli_query ($con, 'SELECT * FROM mensagem ORDER BY idMensagem DESC');
                    while ($mensagem = mysqli_fetch_assoc($resM)):
                        $resU = mysqli_query($con, "SELECT * FROM `usuario` WHERE `idUsuario` ='".$mensagem['idUsuario']."'");
                        $usuario = mysqli_fetch_assoc($resU);
                        ?><tr>
                        <td class="m-2 p-2"><?php echo "@".$usuario['nickname'];?></td>
                        <td class="m-2 p-2"><?php echo $mensagem['assunto'];?></td>
                        <td class="m-2 p-2"><?php echo $mensagem['conteudo'];?></td>
                        <?php endwhile;
                    ?>
                </tbody>
            </table>
    </div>
</div>
                <?php } ?>