<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    // ✅ استعلام جميع القاعات مع بيانات صاحب القاعة
    $stmt = $pdo->query("
        SELECT 
            h.id,
            h.owner_id,
            u.name AS owner_name,
            h.title,
            h.description,
            h.location,
            h.price,
            h.rating,
            h.image
        FROM halls h
        JOIN users u ON u.id = h.owner_id
        ORDER BY h.created_at DESC
    ");

    $halls = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ✅ إرجاع النتيجة بصيغة JSON
    echo json_encode($halls);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch halls",
        "error_detail" => $e->getMessage()
    ]);
}
