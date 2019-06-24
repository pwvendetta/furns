<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../resources/css/bootstrap.css">
  <title>Adm Móveis</title>

  <script src="../resources/js/jquery-3.4.1.js" charset="utf-8"></script>
  <script src="../resources/js/validacaoFormulario.js" charset="utf-8"></script>
</head>


<body class="bg-black">
  <div class="container bg-dark">
    <h2 class="text-warning">Alteração de Dados</h2>
    <h3 class="text-warning">Móveis</h3>

    <div id="formMoveis">
      <form class="bg-dark p-2" action="" method="post" id="formulario">

        <label class="text-light">Nome: </label> <input type="text" name="nome" value="" class="form-control obrigatorio">
        <span class="text-danger"></span>
        <br>
        <label class="text-light">Preço: </label> <input type="number" name="preco" value="" class="form-control"><br>

        <label class="text-light">Imagem </label> <input type="file" name="imagem" value="" class="form-control"><br>
        <br>

        <div class="row">
          <div class="col-md">
            <select name="estilo" class="form-control obrigatorio">
              <option value="">Qualidade</option>
              <option value="1">Normal</option>
              <option value="2" class="text-success">Fine</option>
              <option value="3" class="text-primary">Superior</option>
              <option value="4" style="color: #aa00ff">Epic</option>
              <option value="5" class="text-warning">Legendary</option>
            </select>
            <span class="text-danger"></span>
          </div>

          <div class="col-md">
            <select name="estilo" class="form-control">
              <option value="">Estilo</option>
              <option value="1"></option>
            </select>

          </div>
          <div class="col-md">
            <select name="categoria" class="form-control">
              <option value="">Categoria</option>
              <option value="1"></option>
            </select>
          </div>

          <div class="col-md">
            <select name="sub-categoria" class="form-control">
              <option value="">Sub-Categoria</option>
              <option value="1"></option>
            </select>
          </div>
        </div>
        <br><hr class="bg-warning">
        <div class="row">
          <div class="col-md">
            <input type="submit" name="" value="Cadastrar" class="form-control bg-warning border-warning">
          </div>
          <div class="col-md">
            <input type="submit" name="" value="Alterar"  class="form-control bg-warning border-warning">
          </div>
          <div class="col-md">
            <input type="submit" name="" value="Excluir"  class="form-control bg-warning border-warning">
          </div>
        </div>

      </form>
      <br>
    </div>
  </div>

</body>
</html>
