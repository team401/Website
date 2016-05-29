<?php
if (isset($_POST['name'])) {
    $to = '401frc@gmail.com'; // Use your own email address
    $subject = 'Website Message';

	$message = 'Name: ' . $_POST['name'] . "\r\n\r\n";
	$message .= 'Email: ' . $_POST['email'] . "\r\n\r\n";
	$message .= 'Message: ' . $_POST['comments'];

    $headers = "From: contact@team401.org\r\n";
    $headers .= 'Content-Type: text/plain; charset=utf-8';

    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    if ($email) {
        $headers .= "\r\nReply-To: $email";
    }

    $success = mail($to, $subject, $message, $headers, '‑fhokieguard@gmail.com');
}
?>
