<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../resources/css/bootstrap.css">
  <title>Adm Móveis</title>

  <script src="resources/js/jquery-3.4.1.js" charset="utf-8"></script>
  <!-- UTILIZAÇÃO DO JavaScript E jQuery -->
  <script>
  $(document).ready( function(){
    $('#btnMoveis').click(function(){
      $('#formMoveis').show();
      $('#formPacotes').hide();
      // $('#btnMoveis')toggleClass('btn-primary');
      // $('#btnMoveis')toggleClass('btn-secondary');
      // $('#btnMoveis')removeClass("btn-secondary");
      // $('#btnPacotes')removeClass("btn-primary");
      // $('#btnMoveis')addClass("btn-primary");
      // $('#btnPacotes')addClass("btn-secondary");

    });

    $('#btnPacotes').click(function(){
      $('#formMoveis').hide();
      $('#formPacotes').show();
      // $('#btnMoveis')removeClass("btn-primary");
      // $('#btnPacotes')removeClass("btn-secondary");
      // $('#btnMoveis')addClass("btn-secondary");
      // $('#btnPacotes')addClass("btn-primary");
    });
  } );
  </script> -->
</head>
<body class="bg-black">
  <div class="container bg-dark">

    <h2 class="text-warning">Alteração de Dados</h2>
    <button type="button" id="btnMoveis" class="btn btn-secondary ">Móveis</button>
    <button type="button" id="btnPacotes" class="btn btn-secondary">Pacotes</button>
    <hr><br>
    <div class="row">
      <div class="col-lg">
        <div id="formMoveis">
          <h3 class="text-warning">Móveis</h3>
          <form class="bg-dark p-2" action="" method="post">
            <div class="row">
              <div class="col-md text-center">
                <label class="text-light">Nome: </label> <input type="text" name="nome" value=""><br>
              </div>
              <div class="col-md text-center">
                <label class="text-light">Preço: </label> <input type="number" name="preco" value=""><br>
              </div>
              <div class="col-md text-center">
                <label class="text-light">Imagem </label> <input type="image" name="imagem" value=""><br>
              </div>
            </div>
            <div class="row">
              <div class="col-sm text-center">
                <select name="estilo">
                  <option value="">Qualidade</option>
                  <option value="1">Normal</option>
                  <option value="2">Superior</option>
                  <option value="3">Épico</option>
                  <option value="4">Lendário</option>
                </select><br>
              </div>
              <div class="col-sm text-center">
                <select name="estilo">
                  <option value="">Estilo</option>
                  <option value="1"></option>
                </select><br>
              </div>
              <div class="col-sm text-center">
                <select name="categoria">
                  <option value="">Categoria</option>
                  <option value="1"></option>
                </select><br>
              </div>
              <div class="col-sm text-center">
                <select name="sub-categoria">
                  <option value="">Sub-Categoria</option>
                  <option value="1"></option>
                </select><br>
              </div>
            </div>

            <div class="row">
              <div class="col-md text-center">
                <input type="submit" name="" value="Cadastrar"><br>
              </div>
              <div class="col-md text-center">
                <input type="submit" name="" value="Alterar"><br>
              </div>
              <div class="col-md text-center">
                <input type="submit" name="" value="Excluir"><br>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <br><br><hr class="bg-primary"><br><br> -->

    <div class="row style="display : none"">
      <div class="col-lg">
        <div id="formPacotes" >
          <h3 class="text-warning">Pacotes</h3>
          <form class="bg-dark p-2" action="" method="post">
            <div class="row">
              <div class="col-md text-center">
                <label class="text-light">Nome: </label> <input type="text" name="nome" value=""><br>
              </div>
              <div class="col-md text-center">
                <label class="text-light">Preço: </label> <input type="number" name="preco" value=""><br>
              </div>
              <div class="col-md text-center">
                <label class="text-light">Imagem </label> <input type="image" name="imagem" value=""><br>
              </div>
            </div>
            <div class="row">
              <div class="col-sm text-center">
                <select name="estilo">
                  <option value="">Estilo</option>
                  <option value="1"></option>
                </select><br>
              </div>
              <div class="col-sm text-center">
                <select name="categoria">
                  <option value="">Categoria</option>
                  <option value="1"></option>
                </select><br>
              </div>
            </div>
            <hr>
            <h4>Conteúdo:</h4>
            <div class="">
              <div class="row border border-black py-1">
                <div class="col-md-1">
                </div>
                <div class="col-md-1 p-0 m-0">
                  <input type="number" name="qty" value="" class="p-0 m-0">
                </div>
                <div class="col-md p-0 m-0">
                  <input type="text" name="name" value="" class="p-0 m-0">
                </div>



                <div class="col-md-2 text-right">
                  <button type="button" class="btn btn-primary">+</button>
                  <button type="button" class="btn btn-primary">-</button>
                </div>
              </div>



            </div>













            <div class="row">
              <div class="col-md text-center">
                <input type="submit" name="" value="Cadastrar"><br>
              </div>
              <div class="col-md text-center">
                <input type="submit" name="" value="Alterar"><br>
              </div>
              <div class="col-md text-center">
                <input type="submit" name="" value="Excluir"><br>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
