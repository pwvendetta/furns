<?php require 'template/header.php';
?>
<div class="container bg-light">
    <div class="row">
        <div class="col-lg">
            <form method="post" action="controle/login.php" name="formLogin" id="formLogin" >
                <h3 class="text-warning">Login</h3>
                <label for="login">User</label>
                <input type="text" name="login" id="login" ><br>
                <label for="senha">Password</label>
                <input type="password" name="senha" id="senha" /><br/>
                <input type="submit" value="LOG IN"/>
            </form>
        </div>
        <div class="col-lg">
            <form action="controle/registro.php" name="formRegistro" id="formRegistro" >
                <h3 class="text-warning">Registro</h3>
                <label for="login">User</label>
                <input type="text" name="login" id="login" ><br>
                <label for="senha">Password</label>
                <input type="password" name="senha" id="senha"/><br/>
                <label for="email">E-Mail</label>
                <input type="text" name="email" id="email" ><br>
                <label for="nickname">@Nickname (used in the game)</label>
                <input type="text" name="nickname" id="nickname" ><br>
                <input type="submit" value="SIGN IN"/>
            </form>
        </div>
    </div>
</div>