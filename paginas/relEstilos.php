<?php if(!$_SESSION['logado']){?><h4 class="text-primary">É necessário ser o administrador para visualizar os relatorios</h4>
<?php }else{
?>

<div class="container bg-dark pb-3">
    <div class="row">
    <h2 class="text-warning pl-3" >Estilos Mais Vendidos</h2>
    </div>
    	<div class="bg-light p-3 pr-5">

    <table class="display container" id="">
                <thead>
                    <tr>
                        <th id="estiloHeader">Estilo</th>
                        <th id="qtyHeader">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $estilo= ["Argonian" => 0,
                    "Breton" => 0,
                    "Dark Elf" => 0,
                    "High Elf" => 0,
                    "Khajiit" => 0,
                    "Nord" => 0,
                    "Orcish" => 0,
                    "Redguard" => 0,
                    "Imperial" => 0,
                    "Common" => 0,
                    "Daedric" => 0,
                    "Clockwork" => 0,
                    "Dwarven" => 0,
                    "Telvanni" => 0,
                    "Alinor" => 0,
                    "Murkmire" => 0,
                    "Elsweyr" => 0,
                    "Ashlander" => 0,
                    "Jester" => 0, "undefined" =>0];
                    $con = conecta();
                    $resV = mysqli_query ($con, 'SELECT * FROM venda');
                    while ($vendas = mysqli_fetch_assoc($resV)):
                        $resMV = mysqli_query($con, "SELECT * FROM `movelvenda` WHERE `idVenda` ='". $vendas['idVenda']."'");
                        while ($movelVenda = mysqli_fetch_assoc($resMV)):
                            $resM =  mysqli_query($con, "SELECT * FROM movel WHERE idMovel ='". $movelVenda['idMovel']."'");
                            $movel = mysqli_fetch_assoc($resM);
                            switch ($movel["estilo"]){
                                case ("Argonian"): $estilo['Argonian']+=1; break;
                                case ("Breton"): $estilo['Breton']+=1; break;
                                case ("Dark Elf"): $estilo['Dark Elf']+=1; break;
                                case ("High Elf"): $estilo['High Elf']+=1; break;
                                case ("Khajiit"): $estilo['Khajiit']+=1; break;
                                case ("Nord"): $estilo['Nord']+=1; break;
                                case ("Orcish"): $estilo['Orcish']+=1; break;
                                case ("Redguard"): $estilo['Redguard']+=1; break;
                                case ("Imperial"): $estilo['Imperial']+=1; break;
                                case ("Common"): $estilo['Common']+=1; break;
                                case ("Daedric"): $estilo['Daedric']+=1; break;
                                case ("Clockwork"): $estilo['Clockwork']+=1; break;
                                case ("Dwarven"): $estilo['Dwarven']+=1; break;
                                case ("Telvanni"): $estilo['Telvanni']+=1; break;
                                case ("Alinor"): $estilo['Alinor']+=1; break;
                                case ("Murkmire"): $estilo['Murkmire']+=1; break;
                                case ("Elsweyr"): $estilo['Elsweyr']+=1; break;
                                case ("Ashlander"): $estilo['Ashlander']+=1; break;
                                case ("Jester"): $estilo['Jester']+=1; break; 
                                default: $estilo['undefined']+=1; break;
                            }
                        endwhile;
                    endwhile;
                    ?>
<tr><td>	Argonian	</td><td><?php	echo $estilo["Argonian"];	?></td></tr>
<tr><td>	Breton	</td><td><?php	echo $estilo["Breton"];	?></td></tr>
<tr><td>	Dark Elf	</td><td><?php	echo $estilo["Dark Elf"];	?></td></tr>
<tr><td>	High Elf	</td><td><?php	echo $estilo["High Elf"];	?></td></tr>
<tr><td>	Khajiit	</td><td><?php	echo $estilo["Khajiit"];	?></td></tr>
<tr><td>	Nord	</td><td><?php	echo $estilo["Nord"];	?></td></tr>
<tr><td>	Orcish	</td><td><?php	echo $estilo["Orcish"];	?></td></tr>
<tr><td>	Redguard	</td><td><?php	echo $estilo["Redguard"];	?></td></tr>
<tr><td>	Imperial	</td><td><?php	echo $estilo["Imperial"];	?></td></tr>
<tr><td>	Common	</td><td><?php	echo $estilo["Common"];	?></td></tr>
<tr><td>	Daedric	</td><td><?php	echo $estilo["Daedric"];	?></td></tr>
<tr><td>	Clockwork	</td><td><?php	echo $estilo["Clockwork"];	?></td></tr>
<tr><td>	Dwarven	</td><td><?php	echo $estilo["Dwarven"];	?></td></tr>
<tr><td>	Telvanni	</td><td><?php	echo $estilo["Telvanni"];	?></td></tr>
<tr><td>	Alinor	</td><td><?php	echo $estilo["Alinor"];	?></td></tr>
<tr><td>	Murkmire	</td><td><?php	echo $estilo["Murkmire"];	?></td></tr>
<tr><td>	Elsweyr	</td><td><?php	echo $estilo["Elsweyr"];	?></td></tr>
<tr><td>	Ashlander	</td><td><?php	echo $estilo["Ashlander"];	?></td></tr>
<tr><td>	Jester	</td><td><?php	echo $estilo["Jester"];	?></td></tr>
<tr><td>	Undefined	</td><td><?php	echo $estilo["undefined"];	?></td></tr>
                </tbody>
            </table>
    </div>
</div>
                <?php } ?>



<script>
$('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
</script>