<?php
include '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Content-Type: application/json");

// استقبال البيانات
$data = json_decode(file_get_contents("php://input"));

// التحقق من صحة البيانات
if (!isset($data->id) || !isset($data->owner_id)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input structure']);
    exit;
}

$hall_id = intval($data->id);
$owner_id = intval($data->owner_id);

if (!$con) {
    echo json_encode(['status' => 'error', 'message' => 'DB connection is null']);
    exit;
}
// التحقق من وجود القاعة أولاً
$checkStmt = $con->prepare("SELECT * FROM halls WHERE id = ? AND owner_id = ?");
$checkStmt->execute([$hall_id, $owner_id]);

if ($checkStmt->rowCount() === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Hall not found or unauthorized']);
    exit;
}

// تنفيذ الحذف
$stmt = $con->prepare("DELETE FROM halls WHERE id = ? AND owner_id = ?");
$stmt->execute([$hall_id, $owner_id]);

if ($stmt->rowCount()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Deletion failed']);
}
