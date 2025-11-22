// Funcionalidad principal del sistema de asistencia

document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha actual en formularios de fecha
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.valueAsDate = new Date();
        }
    });
    
    // Establecer hora actual en formularios de hora
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        if (!input.value) {
            const now = new Date();
            input.value = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        }
    });
    
    // Cargar datos de ejemplo para la tabla de asistencia
    loadAttendanceData();
    
    // Verificar autenticación y ajustar permisos
    checkAuthentication();
    adjustUIByUserType();
});

// Función para cargar datos de asistencia (simulación)
function loadAttendanceData() {
    const tableBody = document.querySelector('#attendanceTable tbody');
    
    if (tableBody) {
        // Datos de ejemplo
        const sampleData = [
            { professor: 'Prof. Juan Pérez', date: '17/11/2025', time: '08:30 AM', status: 'present', observations: '' },
            { professor: 'Prof. María García', date: '17/11/2025', time: '08:45 AM', status: 'present', observations: '' },
            { professor: 'Prof. Carlos López', date: '17/11/2025', time: '--:--', status: 'absent', observations: 'Enfermedad' },
            { professor: 'Prof. Ana Rodríguez', date: '16/11/2025', time: '09:15 AM', status: 'late', observations: 'Tráfico' }
        ];
        
        tableBody.innerHTML = '';
        
        sampleData.forEach(item => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            switch(item.status) {
                case 'present': statusClass = 'status-present'; break;
                case 'absent': statusClass = 'status-absent'; break;
                case 'late': statusClass = 'status-late'; break;
            }
            
            row.innerHTML = `
                <td>${item.professor}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td class="${statusClass}">${getStatusText(item.status)}</td>
                <td>${item.observations}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Función para obtener el texto del estado
function getStatusText(status) {
    const statusMap = {
        'present': 'Presente',
        'absent': 'Ausente',
        'late': 'Tardanza',
        'permission': 'Permiso'
    };
    
    return statusMap[status] || status;
}

// Función para verificar autenticación
function checkAuthentication() {
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');
    
    if (userName) {
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            element.textContent = userName;
        });
    }
    
    // Si no está en la página de login y no hay usuario autenticado, redirigir al login
    if (!window.location.pathname.includes('index.html') && 
        !window.location.pathname.endsWith('/') && 
        !userType) {
        window.location.href = 'index.html';
    }
}

// Función para ajustar la UI según el tipo de usuario
function adjustUIByUserType() {
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');
    
    // Si es profesor, ajustar la interfaz
    if (userType === 'profesor') {
        adjustForProfessor(userName);
    }
}

// Función para ajustar la interfaz para profesores
function adjustForProfessor(professorName) {
    // Ocultar elementos que solo el coordinador puede ver
    const coordinadorOnlyElements = document.querySelectorAll('.coordinador-only');
    coordinadorOnlyElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Ajustar el formulario de asistencia para el profesor actual
    const professorSelect = document.getElementById('professor');
    if (professorSelect) {
        professorSelect.innerHTML = `<option value="current">${professorName}</option>`;
        professorSelect.disabled = true;
    }
    
    // En el dashboard, mostrar solo la información relevante para el profesor
    if (window.location.pathname.includes('dashboard.html')) {
        adjustDashboardForProfessor(professorName);
    }
    
    // En la página de profesores, mostrar solo el perfil del profesor actual
    if (window.location.pathname.includes('profesores.html')) {
        adjustProfessorsPageForProfessor(professorName);
    }
}

// Ajustar el dashboard para profesores
function adjustDashboardForProfessor(professorName) {
    // Actualizar estadísticas para mostrar solo datos del profesor
    document.getElementById('totalProfesores').textContent = '1';
    document.getElementById('asistenciasHoy').textContent = '1';
    document.getElementById('ausenciasHoy').textContent = '0';
    document.getElementById('porcentajeAsistencia').textContent = '98%';
    
    // Actualizar actividad reciente
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = `
            <div class="activity-item">
                <span class="activity-time">Hoy, 08:30 AM</span>
                <span class="activity-text">Registró su asistencia</span>
            </div>
            <div class="activity-item">
                <span class="activity-time">Ayer, 05:15 PM</span>
                <span class="activity-text">Actualizó calificaciones</span>
            </div>
        `;
    }
}

// Ajustar la página de profesores para profesores
function adjustProfessorsPageForProfessor(professorName) {
    const content = document.querySelector('.content');
    if (content) {
        content.innerHTML = `
            <h2>Mi Perfil</h2>
            <div class="profile-card">
                <div class="profile-header">
                    <h3>${professorName}</h3>
                    <span class="profile-status status-present">Activo</span>
                </div>
                <div class="profile-info">
                    <div class="info-item">
                        <label>Email:</label>
                        <span>${professorName.toLowerCase().replace(' ', '.').replace('prof. ', '')}@institucion.edu</span>
                    </div>
                    <div class="info-item">
                        <label>Teléfono:</label>
                        <span>555-0100</span>
                    </div>
                    <div class="info-item">
                        <label>Especialidad:</label>
                        <span>Matemáticas</span>
                    </div>
                    <div class="info-item">
                        <label>Fecha de ingreso:</label>
                        <span>15/08/2020</span>
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="stat">
                        <h4>98%</h4>
                        <p>Asistencia Mensual</p>
                    </div>
                    <div class="stat">
                        <h4>45</h4>
                        <p>Estudiantes</p>
                    </div>
                    <div class="stat">
                        <h4>3</h4>
                        <p>Asignaturas</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Manejo del formulario de asistencia
const attendanceForm = document.getElementById('attendanceForm');
if (attendanceForm) {
    attendanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const professor = document.getElementById('professor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const status = document.getElementById('status').value;
        const observations = document.getElementById('observations').value;
        
        if (!professor || !date || !time || !status) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        
        // En un sistema real, aquí se enviarían los datos al servidor
        console.log('Datos de asistencia:', {
            professor, date, time, status, observations
        });
        
        alert('Asistencia registrada correctamente.');
        
        // Recargar la tabla de asistencia
        loadAttendanceData();
        
        // Limpiar el formulario
        attendanceForm.reset();
        
        // Restablecer valores por defecto
        document.getElementById('date').valueAsDate = new Date();
        const now = new Date();
        document.getElementById('time').value = now.getHours().toString().padStart(2, '0') + ':' + 
                                               now.getMinutes().toString().padStart(2, '0');
    });
}