<?php
$servername = "localhost";
$username = "user";
$password = "pass";
$dbname = "LF8";

$p = $_GET["p"];
$a = $_GET["a"];
$t = $_GET["t"];
$s = $_GET["s"];
$i = $_GET["i"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Leistungsdaten (Prozessor, Arbeitsspeicher, Temperatur, Speciherplatz, Prozesse) VALUES (".$p.", ".$a.", ".$t.", ".$s.", ".$i.")";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
