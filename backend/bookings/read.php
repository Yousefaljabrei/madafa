<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    // ✅ التحقق من وجود user_id
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

    if (!$user_id) {
        echo json_encode([]);
        exit;
    }

    // ✅ استعلام الحجوزات المرتبطة بالمستخدم
    $stmt = $pdo->prepare("
        SELECT 
            b.id,
            b.hall_id,
            b.date,
            b.time_slot,
            b.status,
            h.title AS hall_title
        FROM bookings b
        JOIN halls h ON h.id = b.hall_id
        WHERE b.user_id = ?
        ORDER BY b.date DESC
    ");
    $stmt->execute([$user_id]);

    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ✅ إرجاع النتيجة بصيغة JSON
    echo json_encode($bookings);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch bookings",
        "error_detail" => $e->getMessage()
    ]);
}
