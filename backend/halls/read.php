<?php
include_once '../utils/cors.php';
include_once '../config/db.php';

try {
    $owner_id = isset($_GET['owner_id']) ? (int)$_GET['owner_id'] : 0;

    if ($owner_id > 0) {
        $stmt = $pdo->prepare("SELECT * FROM halls WHERE owner_id = ?");
        $stmt->execute([$owner_id]);
    } else {
        $stmt = $pdo->query("SELECT * FROM halls");
    }

    $halls = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($halls);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch halls", "error_detail" => $e->getMessage()]);
}
