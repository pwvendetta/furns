<?php if(!$_SESSION['admin']){?><h4 class="text-primary">É necessário ser o administrador para visualizar os relatorios</h4>
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
                        <th>Usuario</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Concluido</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $con = conecta();
                    $resV = mysqli_query ($con, 'SELECT * FROM venda ORDER BY idvenda DESC');
                    while ($vendas = mysqli_fetch_assoc($resV)):
                        if($vendas['produto'] == 0){
                        $resU = mysqli_query($con, "SELECT * FROM `usuario` WHERE `idUsuario` ='".$vendas['idUsuario']."'");
                        $usuario = mysqli_fetch_assoc($resU);
                        $resMV = mysqli_query($con, "SELECT * FROM `movelvenda` WHERE `idVenda` ='". $vendas['idVenda']."'");
                        ?>
                        <form action="controle/concluirPedido.php" method="post">
                        <tr <?php if($vendas['concluido'] == 1){ echo "style='background-color: #9cfca8'";}?>>
                        <td><?php echo "@".$usuario['nickname'];?></td>
                        <td><?php echo $vendas['valor'];?></td>
                        <td><?php echo $vendas['data'];?></td>
                        <!-- <td></td> -->
                        <td></td>
                        <td></td>
                        <input type="hidden" name="idVenda" value="<?php echo $vendas['idVenda'];?>">
                        <td><input type="submit" <?php if($vendas['concluido'] == 1){ echo "value='X'";}else{echo "value='V'";}?>></td>
                        </tr>
                        <?php
                        while ($movelVenda = mysqli_fetch_assoc($resMV)):
                            // if($movelVenda['produto']==0){
                            $resM =  mysqli_query($con, "SELECT * FROM movel WHERE idMovel ='". $movelVenda['idMovel']."'");
                            $movel = mysqli_fetch_assoc($resM);
                        ?>
                        <tr <?php if($vendas['concluido'] == 1){ echo "style='background-color: #9cfca8'";}?>>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><?php echo $movel['nome'];?></td>
                        <td><?php echo $movelVenda['quantidade'];?></td>
                        <td></td>
                        </tr>                      
                        <?php
                        // }
                        endwhile;
                        echo '</form>';
                        }
                    endwhile;
                    ?>
                </tbody>
            </table>
    </div>
</div>
                <?php } ?>

