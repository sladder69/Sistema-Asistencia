<?php
// Configuración de la base de datos
define('DB_HOST', '127.0.0.1:3306');
define('DB_NAME', 'sistema_profesores');
define('DB_USER', 'root'); // Cambiar por tu usuario
define('DB_PASS', ''); // Cambiar por tu contraseña

class Database {
    private $connection;
    
    public function __construct() {
        try {
            $this->connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch(PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
    
    public function getConnection() {
        return $this->connection;
    }
}

// Crear instancia global de la base de datos
$database = new Database();
$pdo = $database->getConnection();
?>