<?php
// Ejemplo de archivo PHP para manejar el login
// En un sistema real, esto conectaría con una base de datos

header('Content-Type: application/json');

// Simular verificación de credenciales
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$userType = $_POST['userType'] ?? '';

// En un sistema real, aquí verificarías las credenciales en la base de datos
if ($username && $password) {
    // Credenciales válidas
    session_start();
    $_SESSION['userName'] = $username;
    $_SESSION['userType'] = $userType;
    $_SESSION['isAuthenticated'] = true;
    
    echo json_encode([
        'success' => true,
        'message' => 'Login exitoso',
        'redirect' => 'dashboard.html'
    ]);
} else {
    // Credenciales inválidas
    echo json_encode([
        'success' => false,
        'message' => 'Credenciales incorrectas'
    ]);
}
?>