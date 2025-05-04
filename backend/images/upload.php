<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// تأكد من أن الملفات موجودة
if (!isset($_FILES['images'])) {
  echo json_encode(["status" => "error", "message" => "No images found"]);
  exit;
}

$images = $_FILES['images'];
$uploadDir = "../uploads/";
$uploadedPaths = [];

foreach ($images['name'] as $index => $name) {
  $tmpName = $images['tmp_name'][$index];
  $uniqueName = uniqid() . "_" . basename($name);
  $destination = $uploadDir . $uniqueName;

  if (move_uploaded_file($tmpName, $destination)) {
    $uploadedPaths[] = "uploads/" . $uniqueName;
  }
}

echo json_encode([
  "status" => "success",
  "images" => $uploadedPaths
]);
