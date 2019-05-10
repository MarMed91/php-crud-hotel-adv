<?php

  $servername = "localhost";
  $username = "root";
  $lastname = "bool";
  $dbname = "Prova1";

  $conn = new mysqli ($servername, $username, $lastname, $dbname);

  if ($conn->connect_errno) {

    echo $conn ->connect_error;
    return;
  }

  $sql = "
            SELECT id, name, lastname
            FROM paganti
  ";

  $result = $conn->query($sql);
  $res = [];

  if ($result->num_rows > 0) {

      while ($row = $result->fetch_assoc()) { //cicli su variabili della tabella e iesima riga ce la mette nella row;
        $res[]= $row;
      }
   }
    else {

      echo "0 results";
    }
    $conn->close();

     echo json_encode($res);

 ?>
