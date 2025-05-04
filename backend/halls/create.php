<?php
include_once '../utils/cors.php';
include_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"));

$stmt = $pdo->prepare("INSERT INTO halls (owner_id, title, description, location, price, rating) VALUES (?, ?, ?, ?, ?, 0)");
$success = $stmt->execute([
  $data->owner_id,
  $data->title,
  $data->description,
  $data->location,
  $data->price
]);

// Add support for multiple image uploads
if (isset($_FILES['images'])) {
    $imagePaths = [];
    foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
        $fileName = basename($_FILES['images']['name'][$key]);
        $targetPath = '../uploads/' . $fileName;
        if (move_uploaded_file($tmpName, $targetPath)) {
            $imagePaths[] = $fileName;
        }
    }

    // Save image paths in the database
    foreach ($imagePaths as $imagePath) {
        $stmt = $pdo->prepare("INSERT INTO hall_images (hall_id, image_path) VALUES (?, ?)");
        $stmt->execute([$pdo->lastInsertId(), $imagePath]);
    }
}

echo json_encode(["status" => $success ? "success" : "error"]);
