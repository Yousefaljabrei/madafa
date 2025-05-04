<?php
// ✅ السماح للاتصال من React
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    // ✅ قراءة معرّف المستخدم
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "User ID is required"
        ]);
        exit;
    }

    // ✅ استعلام الحجوزات
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

    // ✅ إرسال البيانات على شكل JSON
    echo json_encode($bookings);

} catch (Exception $e) {
    // ✅ معالجة أي خطأ
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch bookings",
        "error_detail" => $e->getMessage()
    ]);
}
