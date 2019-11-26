  <!-- MENU - INICIO -->

    <!-- Cabeçalho -->
    <div class="bg-dark px-5 mb-4">
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
            <h5 class='text-primary float-l'>Welcome <?php echo $_SESSION['nickname'];?>   </h5> 
          </div>
          <div class="col-sm-1-12">
            <form action="controle/logOut.php">
              <input type="submit" value="LogOut" class='btn btn-primary float-r'>
            </form>
          </div>
          <?php
            }
          ?>
        </div>
      <!-- Botões -->
      <div class="row">
        <!-- <div class="col-md">
          <a href="index.php"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Início</button></a>
        </div> -->
        <div class="col-md">
          <a href="index.php?pagina=CompraMoveis"><button  class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit" style="width: 100pt">Móveis</button></a>
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

      <!-- BOTÕES ADM -->
        <?php
        if ($_SESSION['admin']){
        ?>
      <div class="row">
        <div class="col-md">
          <h3 class="text-primary">Gerenciar:</h3>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=FormMoveis"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Móveis</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=FormPacotes"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Pacotes</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=Luxury"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Início</button></a>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <h3 class="text-primary">Relatórios:</h3>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=RelVendaMoveis"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Venda de Móveis</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=RelVendaPacotes"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Venda de Pacotes</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=RelEstilos"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Estilos + Vendidos</button></a>
        </div>
        <div class="col-md">
          <a href="index.php?pagina=RelMensagems"><button class="btn btn-outline-dark pl-5 pr-5 bg-light" type="submit">Mensagens</button></a>
        </div>
      </div>
        <?php } ?>
    </div>
    </div>
  <!-- MENU - FIM -->
