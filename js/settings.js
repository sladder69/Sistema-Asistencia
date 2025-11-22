// Funcionalidad específica para la configuración

document.addEventListener('DOMContentLoaded', function() {
    const generalForm = document.getElementById('generalSettings');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveGeneralSettings();
        });
    }
});

function openTab(tabName) {
    // Ocultar todos los contenidos de pestañas
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remover active de todos los botones
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Mostrar la pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function saveGeneralSettings() {
    const institutionName = document.getElementById('institutionName').value;
    const workStart = document.getElementById('workStart').value;
    const workEnd = document.getElementById('workEnd').value;
    const tolerance = document.getElementById('toleranceMinutes').value;
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando configuración:', {
        institutionName,
        workStart,
        workEnd,
        tolerance
    });
    
    alert('Configuración guardada correctamente');
}

function createBackup() {
    // Simular creación de respaldo
    alert('Creando respaldo de la base de datos...');
    // En un sistema real, aquí se llamaría a un servicio PHP para crear el respaldo
}