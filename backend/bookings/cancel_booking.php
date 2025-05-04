<?php
include_once '../utils/cors.php';
include_once '../config/db.php';
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Content-Type: application/json");
require("../config/db.php");
require("../config/headers.php");

verifyToken($conn);
$booking_id = $_GET['id'] ?? null;
$user_id = getUserIdFromToken();

// التحقق من ملكية الحجز
$stmt = $conn->prepare("SELECT user_id FROM bookings WHERE id = ?");
$stmt->bind_param("i", $booking_id);
$stmt->execute();
$booking_owner = $stmt->get_result()->fetch_assoc()['user_id'];

if ($booking_owner == $user_id || isAdmin()) {
    $stmt = $conn->prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?");
    $stmt->bind_param("i", $booking_id);
    $stmt->execute();
    echo json_encode(["success" => true]);
} else {
    http_response_code(403);
    echo json_encode(["error" => "غير مسموح"]);
}
?>