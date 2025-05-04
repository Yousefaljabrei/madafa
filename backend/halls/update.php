<?php
require_once '../utils/cors.php';
require_once '../config/db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Determine if it's a hall status change (approve/reject)
if (isset($_POST['action'], $_POST['hall_id'])) {
    $action = $_POST['action'];
    $hallId = intval($_POST['hall_id']);

    if ($action === 'approve' || $action === 'reject') {
        $status = $action === 'approve' ? 'approved' : 'rejected';
        $stmt = $pdo->prepare("UPDATE halls SET status = ? WHERE id = ?");
        if ($stmt->execute([$status, $hallId])) {
            echo json_encode(["message" => "Hall status updated to $status"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update hall status"]);
        }
        exit;
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid action"]);
        exit;
    }
}

// 🧩 Validate main hall update data
$requiredFields = ['id', 'title', 'description', 'location', 'price', 'owner_id'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing field: $field"]);
        exit;
    }
}

// 📝 Update hall data
$stmt = $pdo->prepare("UPDATE halls SET title = ?, description = ?, location = ?, price = ? WHERE id = ? AND owner_id = ?");
$success = $stmt->execute([
    $_POST['title'],
    $_POST['description'],
    $_POST['location'],
    $_POST['price'],
    $_POST['id'],
    $_POST['owner_id']
]);

$response = ["status" => $success ? "success" : "error"];

// 📤 Handle new image uploads
if (isset($_FILES['new_images'])) {
    $newImagePaths = [];
    $uploadDir = '../uploads/';
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

    foreach ($_FILES['new_images']['tmp_name'] as $key => $tmpName) {
        $originalName = basename($_FILES['new_images']['name'][$key]);
        $safeName = uniqid() . "_" . preg_replace("/[^A-Za-z0-9_\-\.]/", '', $originalName);
        $targetPath = $uploadDir . $safeName;

        if (move_uploaded_file($tmpName, $targetPath)) {
            $newImagePaths[] = $safeName;
        }
    }

    foreach ($newImagePaths as $imagePath) {
        $stmt = $pdo->prepare("INSERT INTO hall_images (hall_id, image_path) VALUES (?, ?)");
        $stmt->execute([$_POST['id'], $imagePath]);
    }

    $response['new_images'] = $newImagePaths;
}

// 🗑️ Handle image removals (expecting comma-separated string)
if (isset($_POST['remove_images'])) {
    $removeImages = explode(',', $_POST['remove_images']);

    foreach ($removeImages as $imagePath) {
        $stmt = $pdo->prepare("DELETE FROM hall_images WHERE hall_id = ? AND image_path = ?");
        $stmt->execute([$_POST['id'], $imagePath]);

        $filePath = '../uploads/' . $imagePath;
        if (file_exists($filePath)) unlink($filePath);
    }

    $response['removed_images'] = $removeImages;
}

// 🎯 Final output
echo json_encode($response);
