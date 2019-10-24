<?php
$teste = 1;
echo "$teste"; $teste++;//--------------------------------------------------------------------
if(isset($_POST['comments'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "jpwvendettaw2@gmail.com";
    $email_subject = "Test Mails";
    echo "$teste"; $teste++;//--------------------------------------------------------------------

    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
    echo "$teste"; $teste++;//--------------------------------------------------------------------

    // validation expected data exists
    if(!isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
    $comments = $_POST['comments']; // required
    $email_from = "jpwvendettaw@gmail.com"; // required
    echo "$teste"; $teste++;//--------------------------------------------------------------------

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
  echo "$teste"; $teste++;//--------------------------------------------------------------------

  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
    echo "$teste"; $teste++;//--------------------------------------------------------------------

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
    echo "$teste"; $teste++;//--------------------------------------------------------------------

 
    // $email_message .= "Account: ".clean_string($first_name)."\n";
    // $email_message .= "Username: ".clean_string($last_name)."\n";
    // $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
    echo "$teste"; $teste++;//--------------------------------------------------------------------

// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
echo "$teste"; $teste++;//--------------------------------------------------------------------

?>
 
<!-- include your own success html here -->
 
Thank you for contacting us. We will be in touch with you very soon.
 
<?php
 
}
?>