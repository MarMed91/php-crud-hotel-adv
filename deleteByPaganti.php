<?php

if ($_POST["id"]) {

$id = $_POST["id"];

$servername = "localhost";
$username = "root";
$lastname = "bool";
$dbname = "Prova1";

$conn = new msqli ($servername, $username, $lastname, $dbname);

if ($conn -> $connect_errno ) {

  echo $conn ->connect_error;
  return;
}

$sql = "
        DELETE FROM 'paganti'
        WHERE id = 7
 ";
$result = $conn->query($sql);
$conn->close();

echo json_encode($res);
}

 ?>
