<?php
header("Content-Type: application/json");
require("../config/headers.php");

// مثال بسيط (في الواقع يتم إبطال التوكن في الخادم)
echo json_encode(["success" => true, "message" => "تم تسجيل الخروج بنجاح"]);
?>