<div class="container bg-dark pb-3">
    <div class="row">
    <h2 class="text-warning pl-3" >Galeria</h2>
    </div>
    <div class="row">
  <h3 class="text-warning pl-3">Filtros</h3>
    </div>
    <div class="col-sm text-light">
     <div class="dropdown float-l">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Estilos
  </button>
  <ul class="dropdown-menu">
  <li><a href="#"> <input type="checkbox" name="all">All <br> </a></li>
  <li><a href="#"> <input type="checkbox" name="Argonian" value="Argonian">Argonian  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Breton" value="Breton">Breton  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Dark Elf" value="Dark Elf">Dark Elf  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="High Elf" value="High Elf">High Elf  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Khajiit" value="Khajiit">Khajiit <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Nord" value="Nord">Nord  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Orcish" value="Orcish">Orcish  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Redguard" value="Redguard">Redguard  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Wood Elf" value="Wood Elf">Wood Elf  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Imperial" value="Imperial">Imperial  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Common" value="Common">Common  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Daedric" value="Daedric">Daedric <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Clockwork" value="Clockwork">Clockwork <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Dwarven" value="Dwarven">Dwarven <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Telvanni" value="Telvanni">Telvanni  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Alinor" value="Alinor">Alinor  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Murkmire" value="Murkmire">Murkmire  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Elsweyr" value="Elsweyr"> Elsweyr  <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Ashlander" value="Ashlander">Ashlander <br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Jester" value="Jester">Jester  <br> </a></li> 
  </ul>
</div>

<div class="float-r dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Categoria
  </button>
  <ul class="dropdown-menu">
  <li><a href="#"> <input type="checkbox" name="all">All <br> </a></li>
  <li><a href="#"> <input type="checkbox" name="Conservatory" value="Conservatory">Conservatory<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Courtyard" value="Courtyard">Courtyard<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Hearth" value="Hearth">Hearth<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Dining" value="Dining">Dining<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Gallery" value="Gallery">Gallery<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Library" value="Library">Library<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Lighting" value="Lighting">Lighting<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Miscellaneous" value="Miscellaneous">Miscellaneous<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Parlor" value="Parlor">Parlor<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Services" value="Services">Services<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Suite" value="Suite">Suite<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Undercroft" value="Undercroft">Undercroft<br> </a></li> 
<li><a href="#"> <input type="checkbox" name="Workshop" value="Workshop">Workshop<br> </a></li> 

  </ul>
</div>
    
         <!-- <select name="subcategoria" class="form-control">
        <option value="">Sub-Categoria</option>
        https://eso.mmo-fashion.com/furnishings-by-type/
      </select> -->
       
  </div>

  <div class="imgal-container">

    <?php
    $con = mysqli_connect('127.0.0.1', 'root', '', 'furns');
    $res = mysqli_query ($con, 'SELECT * FROM movel');
    while ($movel = mysqli_fetch_assoc($res)):?>
    <img src="<?php echo $movel['imagem']; ?>"  estilo="<?php echo $movel['estilo']; ?>" pacote="<?php echo $movel['pacote']; ?>" categoria="<?php echo $movel['categoria']; ?>" subCategoria="<?php echo $movel['subcategoria']; ?>" alt="<?php echo $movel['nome']; ?>" class="imgal-img">

  <?php endwhile; ?>

</div>

</div>

</div>
 
<script>

  $(document).ready(function () {
    $('.dropdown-toggle').dropdown();
  });

  //java :
    filterSelection("all") // Execute the function and show all columns
    function filterSelection(c) {
      var x, i;
      x = document.getElementsByClassName("column");
      if (c == "all") c = "";
      // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
      for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
      }
    }
</script>