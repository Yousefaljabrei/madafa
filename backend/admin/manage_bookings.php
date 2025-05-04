<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;
    $action = $data['action'] ?? null;

    if ($id && in_array($action, ['approved', 'rejected'])) {
        try {
            $stmt = $pdo->prepare("UPDATE bookings SET status = ? WHERE id = ?");
            $stmt->execute([$action, $id]);
            echo json_encode(["status" => "success", "message" => "Reservation updated successfully"]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Failed to update reservation", "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid data"]);
    }
    exit;
}

try {
    $stmt = $pdo->query("
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
        JOIN users u ON u.id = b.user_id
        JOIN halls h ON h.id = b.hall_id
        ORDER BY b.date DESC
    ");

    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bookings);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch all bookings", "error" => $e->getMessage()]);
}
