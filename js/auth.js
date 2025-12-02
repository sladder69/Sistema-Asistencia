// ==============================================
// 1. INICIALIZACIÓN Y CONFIGURACIÓN
// ==============================================

/**
 * Event listener que se ejecuta cuando el DOM está completamente cargado
 * Inicializa toda la funcionalidad de autenticación
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario de login si existe en la página
    const loginForm = document.getElementById('loginForm');
    
    // Si estamos en la página de login, configurar el event listener
    if (loginForm) {
        /**
         * Event listener para el envío del formulario de login
         * @param {Event} e - Evento de envío del formulario
         */
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío tradicional del formulario
            
            // Obtener valores de los campos del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            // Validar que todos los campos estén completos
            if (!username || !password) {
                alert('Por favor, complete todos los campos.');
                return; // Detener ejecución si hay campos vacíos
            }
            
            // Proceder con la autenticación del usuario
            authenticateUser(username, password, userType);
        });
    }
    
    // Mostrar información de usuarios de prueba en la página de login
    showTestUsersInfo();
});

// ==============================================
// 2. USUARIOS DE PRUEBA Y DATOS
// ==============================================

/**
 * Array de usuarios de prueba para desarrollo y demostración
 * @type {Array<Object>}
 * @property {string} username - Nombre de usuario único
 * @property {string} password - Contraseña del usuario
 * @property {string} userType - Tipo de usuario (coordinador/profesor)
 * @property {string} name - Nombre completo para mostrar
 * @property {Array<string>} permissions - Lista de permisos del usuario
 */
const testUsers = [
    {
        username: 'coordinador',
        password: '123456',
        userType: 'coordinador',
        name: 'Coordinador Principal',
        permissions: ['all'] // Permisos completos
    },
    {
        username: 'profesor',
        password: '123456',
        userType: 'profesor',
        name: 'Prof. Juan Pérez',
        permissions: ['attendance', 'grades', 'notices'] // Permisos limitados
    },
    {
        username: 'maria',
        password: '123456',
        userType: 'profesor',
        name: 'Prof. María García',
        permissions: ['attendance', 'grades', 'notices'] // Permisos limitados
    }
];

// ==============================================
// 3. FUNCIONES DE AUTENTICACIÓN
// ==============================================

/**
 * Autentica un usuario verificando credenciales contra la lista de usuarios de prueba
 * @param {string} username - Nombre de usuario ingresado
 * @param {string} password - Contraseña ingresada
 * @param {string} userType - Tipo de usuario seleccionado
 * @returns {void}
 */
function authenticateUser(username, password, userType) {
    /**
     * Buscar usuario que coincida con las credenciales proporcionadas
     * @type {Object|undefined}
     */
    const user = testUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.userType === userType
    );
    
    // Si se encuentra un usuario válido
    if (user) {
        // Guardar información del usuario en localStorage para persistencia de sesión
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userType', user.userType);
        localStorage.setItem('userPermissions', JSON.stringify(user.permissions));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirigir al dashboard principal después del login exitoso
        window.location.href = 'dashboard.html';
    } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        alert('Credenciales incorrectas. Use los usuarios de prueba proporcionados.');
    }
}

/**
 * Muestra un panel informativo con los usuarios de prueba disponibles
 * Solo se muestra en la página de login
 * @returns {void}
 */
function showTestUsersInfo() {
    // Obtener referencia al contenedor principal del login
    const loginContainer = document.querySelector('.login-container');
    
    // Si estamos en la página de login, crear y agregar el panel informativo
    if (loginContainer) {
        // Crear elemento div para contener la información de usuarios de prueba
        const testUsersInfo = document.createElement('div');
        testUsersInfo.className = 'test-users-info';
        
        // HTML con la información estructurada de usuarios de prueba
        testUsersInfo.innerHTML = `
            <div class="test-users-box">
                <h3>👥 Usuarios de Prueba</h3>
                <div class="test-users-list">
                    <div class="test-user">
                        <strong>Coordinador:</strong><br>
                        Usuario: <code>coordinador</code><br>
                        Contraseña: <code>123456</code><br>
                        <em>Acceso completo al sistema</em>
                    </div>
                    <div class="test-user">
                        <strong>Profesor:</strong><br>
                        Usuario: <code>profesor</code> o <code>maria</code><br>
                        Contraseña: <code>123456</code><br>
                        <em>Acceso limitado</em>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar el panel informativo al contenedor del login
        loginContainer.appendChild(testUsersInfo);
    }
}

// ==============================================
// 4. FUNCIONES DE AUTORIZACIÓN Y PERMISOS
// ==============================================

/**
 * Obtiene los permisos del usuario actual desde localStorage
 * @returns {Array<string>} Array de permisos del usuario
 */
function getUserPermissions() {
    const permissions = localStorage.getItem('userPermissions');
    return permissions ? JSON.parse(permissions) : [];
}

/**
 * Verifica si el usuario actual tiene un permiso específico
 * @param {string} permission - Permiso a verificar
 * @returns {boolean} True si el usuario tiene el permiso, false en caso contrario
 */
function hasPermission(permission) {
    const permissions = getUserPermissions();
    const userType = localStorage.getItem('userType');
    
    // El coordinador tiene todos los permisos automáticamente
    if (userType === 'coordinador') {
        return true;
    }
    
    // Verificar si el permiso solicitado está en la lista de permisos del usuario
    return permissions.includes(permission);
}

// ==============================================
// 5. FUNCIONES DE GESTIÓN DE SESIÓN
// ==============================================

/**
 * Cierra la sesión del usuario actual
 * Limpia toda la información de sesión y redirige al login
 * @returns {void}
 */
function logout() {
    // Limpiar toda la información del usuario del localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('userPermissions');
    localStorage.removeItem('isAuthenticated');
    
    // Redirigir a la página de login
    window.location.href = 'index.html';
}

/**
 * Verifica si el usuario está autenticado al cargar cualquier página
 * Redirige al login si no hay sesión activa (excepto en la página de login)
 * @returns {void}
 */
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    // Si no está autenticado y no está en la página de login, redirigir
    if (!isAuthenticated && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// ==============================================
// 6. EJECUCIÓN AUTOMÁTICA AL CARGAR
// ==============================================

// Verificar autenticación cada vez que se carga una página
checkAuth();