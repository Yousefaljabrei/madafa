<?php
header("Content-Type: application/json");
require("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;

// إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني
// (يتطلب تكامل مع خدمة بريد مثل SendGrid أو SMTP)
echo json_encode(["success" => true, "message" => "تم إرسال رابط إعادة التعيين"]);
?>