<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

header("Content-Type: application/json");
require("../config/db.php");
require("../config/headers.php");

verifyToken($conn);
if (!isAdmin()) { // التحقق من دور المشرف
  http_response_code(403);
  die(json_encode(["error" => "غير مسموح"]));
}

$query = "SELECT b.id, u.name AS user_name, h.name AS hall_name, b.date, b.status 
          FROM bookings b
          JOIN users u ON b.user_id = u.id
          JOIN halls h ON b.hall_id = h.id";
$result = $conn->query($query);

echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>