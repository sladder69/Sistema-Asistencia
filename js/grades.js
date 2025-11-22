// Funcionalidad específica para la gestión de calificaciones

document.addEventListener('DOMContentLoaded', function() {
    loadGrades();
});

function loadGrades() {
    const tableBody = document.querySelector('#gradesTable tbody');
    
    if (tableBody) {
        // Datos de ejemplo
        const grades = [
            { professor: 'Prof. Juan Pérez', subject: 'Matemáticas', students: 30, average: 8.5, status: 'completed' },
            { professor: 'Prof. María García', subject: 'Ciencias', students: 25, average: 7.8, status: 'in-progress' },
            { professor: 'Prof. Carlos López', subject: 'Historia', students: 28, average: 0, status: 'pending' }
        ];
        
        tableBody.innerHTML = '';
        
        grades.forEach(grade => {
            const row = document.createElement('tr');
            let statusText = '';
            let statusClass = '';
            
            switch(grade.status) {
                case 'completed':
                    statusText = 'Completado';
                    statusClass = 'status-present';
                    break;
                case 'in-progress':
                    statusText = 'En Progreso';
                    statusClass = 'status-late';
                    break;
                case 'pending':
                    statusText = 'Pendiente';
                    statusClass = 'status-absent';
                    break;
            }
            
            row.innerHTML = `
                <td>${grade.professor}</td>
                <td>${grade.subject}</td>
                <td>${grade.students}</td>
                <td>${grade.average > 0 ? grade.average : 'N/A'}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>
                    <button class="btn btn-small">Ver Detalles</button>
                    <button class="btn btn-small btn-secondary">Exportar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function exportGrades() {
    // Simular exportación a Excel
    alert('Exportando calificaciones a Excel...');
    // En un sistema real, aquí se generaría y descargaría el archivo Excel
}

function generateReport() {
    // Simular generación de reporte
    alert('Generando reporte de calificaciones...');
    // En un sistema real, aquí se generaría un reporte PDF o similar
}