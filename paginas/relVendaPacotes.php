<?php if(!$_SESSION['logado']){?><h4 class="text-primary">É necessário ser o administrador para visualizar os relatorios</h4>
<?php }else{
?>
<div class="container bg-light">
    <div class="row">
        <div class="col-md">
            <h3 class="text-warning">Relatório de Vendas de Pacotes</h3>
        </div>
    </div>
    <div class="bg-light p-3 pr-5">
    <table class="display container" id="datatable">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $con = conecta();
                    $resV = mysqli_query ($con, 'SELECT * FROM venda ORDER BY idvenda DESC');
                    while ($vendas = mysqli_fetch_assoc($resV)):
                        $resU = mysqli_query($con, "SELECT * FROM `usuario` WHERE `idUsuario` ='".$vendas['idUsuario']."'");
                        $usuario = mysqli_fetch_assoc($resU);
                        $resPV = mysqli_query($con, "SELECT * FROM `pacotevenda` WHERE `idVenda` ='". $vendas['idVenda']."'");
                        ?><tr>
                        <td><?php echo "@".$usuario['nickname'];?></td>
                        <td><?php echo $vendas['valor'];?></td>
                        <td><?php echo $vendas['data'];?></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <?php
                        while ($pacoteVenda = mysqli_fetch_assoc($resPV)):
                            $resP =  mysqli_query($con, "SELECT * FROM pacote WHERE idPacote ='". $pacoteVenda['idPacote']."'");
                            $pacote = mysqli_fetch_assoc($resP);
                        ?>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><?php echo $pacote['nome'];?></td>
                        <td><?php echo $pacoteVenda['quantidade'];?></td>
                        <td></td>
                        </tr>                      
                        <?php
                        endwhile;
                    endwhile;
                    ?>
                </tbody>
            </table>
    </div>
</div>
                <?php } ?>