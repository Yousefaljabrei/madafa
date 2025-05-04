<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    $hall_id = isset($_GET['hall_id']) ? (int)$_GET['hall_id'] : 0;

    if (!$hall_id) {
        echo json_encode([]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT date, time_slot, status
        FROM bookings
        WHERE hall_id = ?
    ");
    $stmt->execute([$hall_id]);

    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bookings);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch calendar", "error" => $e->getMessage()]);
}
