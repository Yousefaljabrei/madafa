<?php
header("Content-Type: application/json");
require("../config/db.php");
require("../config/headers.php");

verifyToken($conn);
if (!isAdmin()) {
    http_response_code(403);
    die(json_encode(["error" => "صلاحيات محدودة"]));
}

$query = "SELECT id, name, email, role FROM users";
$result = $conn->query($query);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>