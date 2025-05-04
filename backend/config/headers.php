<?php
// الاتصال بقاعدة البيانات
require_once("db.php");

// إعدادات الرأس لطلبات API
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// ------ الدوال المساعدة ------ //

/**
 * فك تشفير التوكن واستخراج بيانات المستخدم
 */
function decodeToken() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        return null;
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $decoded = json_decode(base64_decode($token), true);
    return $decoded;
}

/**
 * الحصول على دور المستخدم من التوكن
 */
function getUserRoleFromToken() {
    $data = decodeToken();
    return $data['role'] ?? null;
}

/**
 * الحصول على ID المستخدم من التوكن
 */
function getUserIdFromToken() {
    $data = decodeToken();
    return $data['id'] ?? null;
}

/**
 * التحقق من صلاحية التوكن (مع اتصال بقاعدة البيانات)
 */
function verifyToken($conn) {
    $data = decodeToken();
    if (!$data) {
        http_response_code(401);
        die(json_encode(["error" => "مطلوب مصادقة"]));
    }

    // التحقق من وجود المستخدم في قاعدة البيانات
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        die(json_encode(["error" => "توكن غير صالح"]));
    }
}

/**
 * التحقق من إذا كان المستخدم مشرفًا
 */
function isAdmin() {
    return (getUserRoleFromToken() === 'admin');
}
?>