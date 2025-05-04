<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    $owner_id = isset($_GET['owner_id']) ? (int)$_GET['owner_id'] : 0;

    if (!$owner_id) {
        echo json_encode([]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT 
            b.id,
            b.user_id,
            b.hall_id,
            u.name AS user_name,
            h.title AS hall_title,
            b.date,
            b.time_slot,
            b.status
        FROM bookings b
        JOIN halls h ON h.id = b.hall_id
        JOIN users u ON u.id = b.user_id
        WHERE h.owner_id = ?
        ORDER BY b.date DESC
    ");
    $stmt->execute([$owner_id]);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bookings);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch bookings by owner",
        "error_detail" => $e->getMessage()
    ]);
}
