<?php
require_once __DIR__ . '/../config/db.php';

require_once '../config/db.php';
header('Content-Type: application/json');

// 📤 جلب القاعات من قاعدة البيانات
$sql = "SELECT h.id, h.title, h.description, h.location, h.price, h.images, h.created_at, u.name as owner_name
        FROM halls h
        JOIN users u ON h.owner_id = u.id
        ORDER BY h.created_at DESC";

$result = $conn->query($sql);

$halls = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // 👁️ فك تشفير الصور (إن كانت محفوظة كسلسلة JSON)
        $row['images'] = json_decode($row['images'], true);
        $halls[] = $row;
    }
}

echo json_encode([
  "status" => "success",
  "data" => $halls
]);
