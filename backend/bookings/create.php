<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    // ✅ قراءة بيانات JSON القادمة من React أو أي عميل
    $data = json_decode(file_get_contents("php://input"));

    if (
        !$data ||
        !isset($data->user_id) ||
        !isset($data->hall_id) ||
        !isset($data->date) ||
        !isset($data->time_slot)
    ) {
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete booking data"
        ]);
        exit;
    }

    // ✅ التحقق من تكرار الحجز (نفس القاعة + نفس التاريخ + نفس الوقت)
    $checkStmt = $pdo->prepare("
        SELECT COUNT(*) 
        FROM bookings 
        WHERE hall_id = ? AND date = ? AND time_slot = ?
    ");
    $checkStmt->execute([
        $data->hall_id,
        $data->date,
        $data->time_slot
    ]);
    $exists = $checkStmt->fetchColumn();

    if ($exists > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "هذه الفترة محجوزة مسبقاً."
        ]);
        exit;
    }

    // ✅ تنفيذ إدخال الحجز الجديد
    $stmt = $pdo->prepare("
        INSERT INTO bookings (user_id, hall_id, date, time_slot, status)
        VALUES (?, ?, ?, ?, 'pending')
    ");
    $stmt->execute([
        $data->user_id,
        $data->hall_id,
        $data->date,
        $data->time_slot
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "تم إنشاء الحجز بنجاح"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "فشل إنشاء الحجز",
        "error_detail" => $e->getMessage()
    ]);
}
