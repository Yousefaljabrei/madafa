<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->hall_id) || !isset($data->image_path)) {
    echo json_encode(["status" => "error", "message" => "Missing hall_id or image_path"]);
    exit;
}

$hallId = $data->hall_id;
$imagePath = $data->image_path;

// Delete image record from database
$stmt = $pdo->prepare("DELETE FROM hall_images WHERE hall_id = ? AND image_path = ?");
$success = $stmt->execute([$hallId, $imagePath]);

if ($success) {
    $filePath = '../uploads/' . $imagePath;
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    echo json_encode(["status" => "success", "message" => "Image deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete image"]);
}