<div class="container bg-dark pb-3">
    <div class="row">
    <h2 class="text-warning pl-3" >Login / Registro</h2>
    </div>
    	<!-- <div class="bg-light p-3 pr-5"> -->





    <div class="row">
        <div class="col-lg">
            <form method="post" action="controle/login.php" name="formLogin" id="formLogin" >
                <h3 class="text-warning">Login</h3>
                <label for="login" class="text-primary">User</label>
                <input type="text" name="login" id="login" ><br>
                <label for="senha" class="text-primary">Password</label>
                <input type="password" name="senha" id="senha" /><br/>
                <input type="submit" value="LOG IN"/>
            </form>
        </div>
        <div class="col-lg">
            <form method="post" action="controle/registro.php" name="formRegistro" id="formRegistro" >
                <h3 class="text-warning">Registro</h3>
                <label for="login" class="text-primary">User</label>
                <input type="text" name="login" id="login" ><br>
                <label for="senha" class="text-primary">Password</label>
                <input type="password" name="senha" id="senha"/><br/>
                <label for="email" class="text-primary">E-Mail</label>
                <input type="text" name="email" id="email" ><br>
                <label for="nickname" class="text-primary">@Nickname (used in the game)</label>
                <input type="text" name="nickname" id="nickname" ><br>
                <input type="submit" value="SIGN IN"/>
            </form>
        </div>
    </div>
</div>