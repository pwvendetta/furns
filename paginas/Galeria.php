<div class="container bg-dark">
  <h2 class="text-warning">Galeria</h2>
  <!-- Linha dos filtros -->
  <h3 class="text-warning pl-3">Filtros</h3>
  <div class="row" id="">
    <div class="col-sm text-light">
     
      <label for="">Estilos</label>

      <div class="col-sm">
<input type="checkbox" name="Argonian" value="Argonian">Argonian	<br> 
<input type="checkbox" name="Breton" value="Breton">Breton	<br> 
<input type="checkbox" name="Dark Elf" value="Dark Elf">Dark Elf	<br> 
<input type="checkbox" name="High Elf" value="High Elf">High Elf	<br> 
<input type="checkbox" name="Khajiit" value="Khajiit">Khajiit	<br> 
<input type="checkbox" name="Nord" value="Nord">Nord	<br> 
<input type="checkbox" name="Orcish" value="Orcish">Orcish	<br> 
<input type="checkbox" name="Redguard" value="Redguard">Redguard	<br> 
<input type="checkbox" name="Wood Elf" value="Wood Elf">Wood Elf	<br> 
<input type="checkbox" name="Imperial" value="Imperial">Imperial	<br> 
</div>
<div class="col-sm">
<input type="checkbox" name="Common" value="Common">Common	<br> 
<input type="checkbox" name="Daedric" value="Daedric">Daedric	<br> 
<input type="checkbox" name="Clockwork" value="Clockwork">Clockwork	<br> 
<input type="checkbox" name="Dwarven" value="Dwarven">Dwarven	<br> 
<input type="checkbox" name="Telvanni" value="Telvanni">Telvanni	<br> 
<input type="checkbox" name="Alinor" value="Alinor">Alinor	<br> 
<input type="checkbox" name="Murkmire" value="Murkmire">Murkmire	<br> 
<input type="checkbox" name="Elsweyr" value="Elsweyr"> Elsweyr	<br> 
<input type="checkbox" name="Ashlander" value="Ashlander">Ashlander	<br> 
<input type="checkbox" name="Jester" value="Jester">Jester	<br> 
</div>
    </div>

    <div class="col-md text-light">
      <!-- <select name="categoria" class="form-control">
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
      </select> -->
      <input type="checkbox" name="Conservatory" value="Conservatory">Conservatory<br> 
      <input type="checkbox" name="Courtyard" value="Courtyard">Courtyard<br> 
      <input type="checkbox" name="Hearth" value="Hearth">Hearth<br> 
      <input type="checkbox" name="Dining" value="Dining">Dining<br>   
      <input type="checkbox" name="Gallery" value="Gallery">Gallery<br> 
      <input type="checkbox" name="Library" value="Library">Library<br> 
      <input type="checkbox" name="Lighting" value="Lighting">Lighting<br> 
      <input type="checkbox" name="Miscellaneous" value="Miscellaneous">Miscellaneous<br> 
      <input type="checkbox" name="Parlor" value="Parlor">Parlor<br> 
      <input type="checkbox" name="Services" value="Services">Services<br> 
      <input type="checkbox" name="Suite" value="Suite">Suite<br> 
      <input type="checkbox" name="Undercroft" value="Undercroft">Undercroft<br> 
      <input type="checkbox" name="Workshop" value="Workshop">Workshop<br> 


    </div>
    <div class="col-md text-light">
      <!-- <select name="subcategoria" class="form-control">
        <option value="">Sub-Categoria</option>
        https://eso.mmo-fashion.com/furnishings-by-type/
      </select> -->
       <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car 

    </div>


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