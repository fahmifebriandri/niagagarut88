<?php
header("Access-Control-Allow-Origin:*");
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 300);
session_start();

function db_conn(){
	$servername = "localhost";
	$username = "u1005291_niagagarut88_utf8";
	$password = "u1005291_niagagarut88_utf8";
	$dbname = "u1005291_niagagarut88_utf8";
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error){ die("Connection failed: " . $conn->connect_error); }
	return $conn;
}
function db_select($query){
	//echo $query;
	$conn = db_conn();
	$result = $conn->query($query);
	$return = array();
	$return['num_rows'] = $result->num_rows;
	if($result->num_rows > 0){
		$return['message'] = $result->num_rows." results";
		$return['data'] = $result->fetch_all(MYSQLI_ASSOC);
	} else {
		$return['message'] = "0 results";
		$return['data'] = 0;
	}
	return $return;
	$conn->close();	
}
function db_insert($query){
	$query = urldecode($query);
	$conn = db_conn();
	if($conn->query($query) === TRUE){
		return $conn->insert_id;
	}else{
		return "Error: " . $query . "<br>" . $conn->error;
	}
	$conn->close();
}
function db_exec($query){
	$conn = db_conn();
	if ($conn->query($query) === TRUE) {
		return 1;
	} else {
		return $conn->error;
	}
	$conn->close();
}
?>