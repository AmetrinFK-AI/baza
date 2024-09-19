\<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = 'data/prompts.json';

    // Получаем данные из запроса
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        // Читаем текущие данные из файла
        if (file_exists($file)) {
            $currentData = json_decode(file_get_contents($file), true);
        } else {
            $currentData = [];
        }

        // Добавляем новые данные
        $currentData[] = $data;

        // Сохраняем обновленные данные обратно в файл
        file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));

        // Возвращаем успешный ответ
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else {
    http_response_code(405); // Метод не разрешен
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
