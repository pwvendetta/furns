<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../resources/css/bootstrap.css">
  <title>Compra : Items</title>

  <!-- IMPORTAÇÃO DO JS -->
  <script src=" jquery-3.4.1.js" charset="utf-8"></script>
  <!-- UTILIZAÇÃO DO JavaScript E jQuery -->
  <script>
  $(document).ready( function(){
    $("#teste").click(function() {
      // alert("batata");
      $("#teste2").show();
      // $("#teste").click(function() {
      //   $("#teste2").hide();
      // });
    });


    // alert("FUNCIONOU!");
  } );
  </script>



</head>
<body class="bg-black">
  <div class="container">

    <div class="row text-white">
      <h1>Compra: Items</h1>
    </div>
    <!-- FILTROS -->
    <div class="container  my-2 py-2 bg-dark text-primary ">
      <h5>Filtros:</h5>
      <div class="row">
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Estilos
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categoria
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Subcategoria
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Qualidade
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Preço
            </a>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search
            </a>
          </div>
        </div>

      </div>
    </div>
    <!-- FIM FILTROS -->
    <!-- TABELA SELECIONAR ITEMS  -->
    <div class="container bg-dark my-2 text-white py-2">
      <div class="row ">
        <div class="col-lg">
        <div class="row text-warning">
          <div class="col-sm">
            <p>QTY</p>
          </div>
          <div class="col-lg">
            <p>NOME</p>
          </div>
          <div class="col-sm">
            <p>ESTILO</p>
          </div>
          <div class="col-sm">
            <p>CATEGORIA</p>
          </div>
          <div class="col-sm">
            <p>SUB-CATEGORIA</p>
          </div>
          <div class="col-sm">
            <p>PREÇO</p>
          </div>
        </div>
        <!-- DATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASE -->
        <?php while ($movel = mysqli_fetch_assoc($res)): ?>
            <div class="row">
              <div class="col-sm">
                <p>N</p>
              </div>
              <div class="col-md">
                <?php echo $movel['nome']; ?>
              </div>
              <div class="col-md">
<?php echo $movel['estilo']; ?>
              </div>
              <div class="col-md">
                <p>Dining</p>
              </div>
              <div class="col-md">
                <p>Chairs</p>
              </div>
              <div class="col-md">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Chair, Practical</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Dining</p>
              </div>
              <div class="col-sm">
                <p>Chairs</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Stool, Practical</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Stools</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Vent, Octagonal Fan</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Machinery</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Switch, Sturdy</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Machinery</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Control Panel, Single</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Machinery</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Crate, Large Open</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Cargo</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Crate, Large Closed</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Cargo</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <p>ESTILO</p>
              </div>
              <div class="col-lg">
                <p>Clockwork Barrel, Sealed</p>
              </div>
              <div class="col-sm">
                <p>Clockwork</p>
              </div>
              <div class="col-sm">
                <p>Workshop</p>
              </div>
              <div class="col-sm">
                <p>Cargo</p>
              </div>
              <div class="col-sm">
                <p>PREÇO</p>
              </div>
            </div>


        </div>


      </div>
      <!-- DATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASEDATABASE -->

    </div>
<!-- FIM TABELA DE SELECIONAR ITEMS -->
    <div class="row my-2 mx-1">
      <!-- TABELA ITEMS SELECIONADOS -->
      <div class="col-lg md-5 bg-dark text-white py-2 mr-0">

        <div class="row text-primary">
          <div class="col-sm pl-3">
            <p>Item</p>
          </div>
          <div class="col-sm text-center">
            <p>QTY</p>
          </div>
          <div class="col-sm text-right">
            <p>PREÇO</p>
          </div>
        </div>


        <div class="row">
          <div class="col-sm">
            <p>Clockwork Chair, Practical</p>
          </div>
          <div class="col-sm text-center">
            <p>3</p>
          </div>
          <div class="col-sm text-right">
            <p>6400</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <p>Clockwork Stool, Practical</p>
          </div>
          <div class="col-sm text-center">
            <p>2</p>
          </div>
          <div class="col-sm text-right">
            <p>3200</p>
          </div>
        </div>

      </div>
      <!-- FIM TABELA ITEMS SELECIONADOS -->
      <!-- COMFIRMAÇÃO DE COMPRA -->
      <div class="col-sm-2-12 bg-dark ml-2 text-center text-warning">
        <div class="container">
          <p>Items: 5</p>
          <p>Preço: 9600</p>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" type="submit">Comprar</button>
        </div>
        <div class="container">
          <button class="btn btn-outline-dark pl-5 pr-5 bg-secondary text-white" type="submit">Limpar</button>
        </div>
      </div>
      <!-- COMFIRMAÇÃO DE COMPRA -->
    </div>
  </div>













</body>




</html>
