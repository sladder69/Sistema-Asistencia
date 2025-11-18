<?php
session_start();

// Verificar si el usuario está logueado
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Verificar si es coordinador
function isCoordinador() {
    return isset($_SESSION['user_tipo']) && $_SESSION['user_tipo'] === 'coordinador';
}

// Verificar si es profesor
function isProfesor() {
    return isset($_SESSION['user_tipo']) && $_SESSION['user_tipo'] === 'profesor';
}

// Redirigir si no está logueado
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ../login.php');
        exit();
    }
}

// Redirigir si no es coordinador
function requireCoordinador() {
    requireLogin();
    if (!isCoordinador()) {
        header('Location: ../dashboard.php');
        exit();
    }
}
?>