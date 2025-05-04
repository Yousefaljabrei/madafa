<?php
require_once __DIR__ . '/../config/db.php';

// 📦 الاتصال بقاعدة البيانات
require_once '../config/db.php';

// 🧠 تعيين نوع المحتوى
header('Content-Type: application/json');

// 🛡️ حماية من الوصول غير المصرح به (يمكنك تعديلها لاحقاً للتحقق من التوكن أو الجلسة)

// 📥 تنفيذ استعلام جلب كل المستخدمين
$sql = "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC";
$result = $conn->query($sql);

$users = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// 🔁 إعادة النتائج كـ JSON
echo json_encode([
  "status" => "success",
  "data" => $users
]);
