
<div class="container bg-dark">
<h2 class="text-warning">Contato</h2>

<div class="row my-2 mx-1">
<?php if($_SESSION['logado']){
?>
<form action="controle/send_form_email.php" method="post">
    <!-- <label for="" class="text-primary">Subject</label><br>
    <input name="subject" type="text" style="width:100%"> -->
    <br>
    <label for="comments">Comments</label>
    <textarea  name="comments" maxlength="1000" cols="25" rows="6"></textarea>

    <!-- <input type="submit" value="Submit">  -->
    <input type="submit" name="" value="Enviar" class="form-control bg-warning border-warning">   
</form>
<?php }else{
?><h4 class="text-primary">É necessário estar logado para entrar em contato</h4><?php } ?>
</div>