<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/db.php";

$stmt = $pdo->query("SELECT id, name, email, role FROM users");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
