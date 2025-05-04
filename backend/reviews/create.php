<?php
include_once '../utils/cors.php';
include_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"));

$stmt = $pdo->prepare("INSERT INTO reviews (hall_id, user_id, rating, comment) VALUES (?, ?, ?, ?)");
$success = $stmt->execute([
  $data->hall_id,
  $data->user_id,
  $data->rating,
  $data->comment
]);

echo json_encode(["status" => $success ? "success" : "error"]);
