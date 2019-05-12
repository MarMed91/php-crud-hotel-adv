<?php

if ($_POST["id"]) {

$id = $_POST["id"];

$servername = "localhost";
$username = "root";
$lastname = "bool";
$dbname = "Prova1";

$conn = new mysqli ($servername, $username, $lastname, $dbname);

if ($conn ->connect_errno ) {

  echo $conn ->connect_error;
  return;
}

$sql = "
        DELETE FROM paganti
        WHERE id LIKE $id
 ";
$result = $conn->query($sql);
$conn->close();


}

 ?>
