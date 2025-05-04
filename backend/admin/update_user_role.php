<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"));
$userId = $data->id ?? null;
$newRole = $data->role ?? null;

if (!$userId || !$newRole) {
    echo json_encode(["status" => "error", "message" => "User ID and role are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
    $stmt->execute([$newRole, $userId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "User role updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to update user role", "error_detail" => $e->getMessage()]);
}