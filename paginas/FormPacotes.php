<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../resources/css/bootstrap.css">
  <title>Inicio</title>
</head>
<body class="bg-black">
  <div class="container bg-dark">
    <h2 class="text-warning">Alteração de Dados</h2>
    <h3 class="text-warning">Pacotes</h3>
    <form class="bg-dark p-2" action="" method="post" id="formulario">

      <label class="text-light">Nome: </label> <input type="text" name="nome" value="" class="form-control obrigatorio">
      <span class="text-danger"></span><br>
      <label class="text-light">Preço: </label> <input type="number" name="preco" value="" class="form-control"><br>
      <label class="text-light">Imagem </label> <input type="file" name="imagem" value="" class="form-control"><br>

      <select name="estilo" class="form-control">
        <option value="">Estilo</option>
        <option value="1"></option>
      </select><br>
      <select name="categoria" class="form-control">
        <option value="">Categoria</option>
        <option value="1"></option>
      </select><br>
      <hr class="bg-warning">
      <h4 class="text-warning">Conteúdo:</h4>
      <div class="">
        <div class="row border border-black py-2 rounded-sm">
          <div class="col-md-1">
          </div>
          <div class="col-md-1 p-0 m-0">
            <input type="number" name="qty" value="" class="p-0 m-0 form-control">
          </div>
          <div class="col-md p-0 m-0">
            <input type="text" name="name" value="" class="p-0 m-0 form-control">
          </div>



          <div class="col-md-2 text-right">
            <button type="button" class="btn btn-primary">+</button>
            <button type="button" class="btn btn-primary">-</button>
          </div>
        </div>



      </div>
      <hr class="bg-warning">
      <div class="row">
        <div class="col-md text-center">
          <input type="submit" name="" value="Cadastrar" class="form-control bg-warning border-warning"><br>
        </div>
        <div class="col-md text-center">
          <input type="submit" name="" value="Alterar" class="form-control bg-warning border-warning"><br>
        </div>
        <div class="col-md text-center">
          <input type="submit" name="" value="Excluir" class="form-control bg-warning border-warning"><br>
        </div>
      </div>
    </form>
  </div>

</div>
</body>
</html>
