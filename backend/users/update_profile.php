<?php
header("Content-Type: application/json");
require("../config/db.php");
require("../config/headers.php");

verifyToken($conn);
$user_id = getUserIdFromToken();

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$email = $data['email'];

$stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $name, $email, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "فشل التحديث"]);
}
?>