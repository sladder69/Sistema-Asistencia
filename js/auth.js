// Funcionalidad de autenticación con usuarios de prueba

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            if (!username || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }
            
            // Verificar credenciales con usuarios de prueba
            authenticateUser(username, password, userType);
        });
    }
    
    // Mostrar información de usuarios de prueba en la página de login
    showTestUsersInfo();
});

// Usuarios de prueba
const testUsers = [
    {
        username: 'coordinador',
        password: '123456',
        userType: 'coordinador',
        name: 'Coordinador Principal',
        permissions: ['all']
    },
    {
        username: 'profesor',
        password: '123456',
        userType: 'profesor',
        name: 'Prof. Juan Pérez',
        permissions: ['attendance', 'grades', 'notices']
    },
    {
        username: 'maria',
        password: '123456',
        userType: 'profesor',
        name: 'Prof. María García',
        permissions: ['attendance', 'grades', 'notices']
    }
];

// Función para autenticar usuario
function authenticateUser(username, password, userType) {
    const user = testUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.userType === userType
    );
    
    if (user) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userType', user.userType);
        localStorage.setItem('userPermissions', JSON.stringify(user.permissions));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Credenciales incorrectas. Use los usuarios de prueba proporcionados.');
    }
}

// Función para mostrar información de usuarios de prueba
function showTestUsersInfo() {
    const loginContainer = document.querySelector('.login-container');
    
    if (loginContainer) {
        const testUsersInfo = document.createElement('div');
        testUsersInfo.className = 'test-users-info';
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
        
        loginContainer.appendChild(testUsersInfo);
    }
}

// Función para cerrar sesión
function logout() {
    // Limpiar información del usuario
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('userPermissions');
    localStorage.removeItem('isAuthenticated');
    
    // Redirigir al login
    window.location.href = 'index.html';
}

// Verificar si el usuario está autenticado al cargar la página
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (!isAuthenticated && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Obtener permisos del usuario actual
function getUserPermissions() {
    const permissions = localStorage.getItem('userPermissions');
    return permissions ? JSON.parse(permissions) : [];
}

// Verificar si el usuario tiene un permiso específico
function hasPermission(permission) {
    const permissions = getUserPermissions();
    const userType = localStorage.getItem('userType');
    
    // El coordinador tiene todos los permisos
    if (userType === 'coordinador') {
        return true;
    }
    
    return permissions.includes(permission);
}

// Llamar a checkAuth cuando se carga la página
checkAuth();