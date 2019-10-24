  <!-- MENU - INICIO -->

    <div class="bg-dark m-0 px-5">
      <!-- Cabeçalho -->
      <div class="row text-white">

     
        <div class="col-sm-1-12 img">
        <a href="index.php"><img src="./resources/Images/Chair.png" alt="Ícone" class="img-fluid" width="25px">        </a>
        </div>
        <div class="col-lg">
        <a href="index.php"><h1 class="text-warning">Furns</h1></a>
        </div>

        <?php

        if($_SESSION['logado'] == false){

        echo "<div class='col-sm-1-12'><a href='?pagina=LoginRegistro'><button type='button' class='btn btn-primary'>Sign In / Log In</button></a></div>";
        
        }else{
          ?>
          <div class="col-sm-1-12">
          <span class='text-primary'>Welcome <?php echo $_SESSION['nickname'];?></span></div><div class="col-sm-1-12">
          <form action="controle/logOut.php"><input type="submit" value="LogOut" class='btn btn-primary'></form>
          </div>
          <?php
        }

        ?>
        </div>
      </div>
      <!-- Botões -->
      <div class="row">
        <div class="col-md">
          <a href="index.php"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Início</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=CompraMoveis"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Móveis</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=CompraPacotes"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Pacotes</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=Galeria"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Galeria</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=Contato"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Contato</button></a>
        </div>
      </div>
    </div>
  <!-- MENU - FIM -->
