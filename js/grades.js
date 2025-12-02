// ==============================================
// 1. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==============================================

/**
 * Event listener que se ejecuta cuando el DOM está completamente cargado
 * Inicializa la funcionalidad del módulo de calificaciones
 */
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las calificaciones automáticamente al entrar a la página
    loadGrades();
});

// ==============================================
// 2. FUNCIONES PRINCIPALES DE GESTIÓN
// ==============================================

/**
 * Carga y muestra las calificaciones en la tabla principal
 * Utiliza datos de ejemplo para demostración
 * @returns {void}
 */
function loadGrades() {
    // Obtener referencia al cuerpo de la tabla donde se mostrarán los datos
    const tableBody = document.querySelector('#gradesTable tbody');
    
    // Verificar que la tabla existe en la página actual
    if (tableBody) {
        /**
         * Array de datos de ejemplo para demostración
         * En un sistema real, estos datos vendrían de una API o base de datos
         * @type {Array<Object>}
         * @property {string} professor - Nombre del profesor
         * @property {string} subject - Asignatura impartida
         * @property {number} students - Número de estudiantes
         * @property {number} average - Calificación promedio
         * @property {string} status - Estado de las calificaciones
         */
        const grades = [
            { 
                professor: 'Prof. Juan Pérez', 
                subject: 'Matemáticas', 
                students: 30, 
                average: 8.5, 
                status: 'completed' 
            },
            { 
                professor: 'Prof. María García', 
                subject: 'Ciencias', 
                students: 25, 
                average: 7.8, 
                status: 'in-progress' 
            },
            { 
                professor: 'Prof. Carlos López', 
                subject: 'Historia', 
                students: 28, 
                average: 0, 
                status: 'pending' 
            }
        ];
        
        // Limpiar el contenido actual de la tabla para evitar duplicados
        tableBody.innerHTML = '';
        
        /**
         * Iterar sobre cada calificación y crear una fila en la tabla
         * @param {Object} grade - Objeto con los datos de la calificación
         */
        grades.forEach(grade => {
            // Crear elemento tr (table row) para cada registro
            const row = document.createElement('tr');
            
            // Variables para el texto y clase CSS del estado
            let statusText = '';
            let statusClass = '';
            
            /**
             * Determinar el texto y clase CSS según el estado de la calificación
             * @param {string} grade.status - Estado de la calificación
             */
            switch(grade.status) {
                case 'completed':
                    statusText = 'Completado';
                    statusClass = 'status-present'; // Clase CSS para color verde
                    break;
                case 'in-progress':
                    statusText = 'En Progreso';
                    statusClass = 'status-late'; // Clase CSS para color naranja/amarillo
                    break;
                case 'pending':
                    statusText = 'Pendiente';
                    statusClass = 'status-absent'; // Clase CSS para color rojo
                    break;
            }
            
            /**
             * Crear el HTML interno de la fila con los datos de la calificación
             * Se utiliza template literal para interpolar variables
             */
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
            
            // Agregar la fila creada al cuerpo de la tabla
            tableBody.appendChild(row);
        });
    }
}

// ==============================================
// 3. FUNCIONES DE EXPORTACIÓN Y REPORTES
// ==============================================

/**
 * Simula la exportación de calificaciones a formato Excel
 * En un sistema real, generaría y descargaría un archivo .xlsx
 * @returns {void}
 */
function exportGrades() {
    // Mostrar mensaje de simulación
    alert('Exportando calificaciones a Excel...');
    
    /**
     * EN UN SISTEMA REAL, ESTA FUNCIÓN INCLUIRÍA:
     * 1. Recopilación de datos actuales de la tabla
     * 2. Formateo de datos para Excel
     * 3. Generación de archivo .xlsx usando librerías como SheetJS
     * 4. Descarga automática del archivo
     * 
     * Ejemplo de implementación real:
     * const workbook = XLSX.utils.book_new();
     * const worksheet = XLSX.utils.json_to_sheet(gradesData);
     * XLSX.utils.book_append_sheet(workbook, worksheet, "Calificaciones");
     * XLSX.writeFile(workbook, "calificaciones.xlsx");
     */
}

/**
 * Simula la generación de un reporte de calificaciones
 * En un sistema real, generaría un reporte PDF o documento formal
 * @returns {void}
 */
function generateReport() {
    // Mostrar mensaje de simulación
    alert('Generando reporte de calificaciones...');
    
    /**
     * EN UN SISTEMA REAL, ESTA FUNCIÓN INCLUIRÍA:
     * 1. Recopilación de datos y estadísticas
     * 2. Formateo para reporte formal
     * 3. Generación de PDF usando librerías como jsPDF
     * 4. Descarga automática del reporte
     * 
     * Ejemplo de implementación real:
     * const doc = new jsPDF();
     * doc.text('Reporte de Calificaciones', 20, 20);
     * doc.save('reporte-calificaciones.pdf');
     */
}