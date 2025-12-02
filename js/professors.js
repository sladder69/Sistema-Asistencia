// ==============================================
// 1. INICIALIZACIÓN Y CONFIGURACIÓN
// ==============================================

/**
 * Event listener que se ejecuta cuando el DOM está completamente cargado
 * Configura todas las funcionalidades del módulo de profesores
 */
document.addEventListener('DOMContentLoaded', function() {
    // Cargar la lista de profesores al iniciar la página
    loadProfessors();
    
    // Configurar el event listener para el formulario de profesores
    const professorForm = document.getElementById('professorForm');
    if (professorForm) {
        /**
         * Manejar el envío del formulario de creación/edición de profesores
         * @param {Event} e - Evento de envío del formulario
         */
        professorForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío tradicional del formulario
            saveProfessor();    // Ejecutar función de guardado
        });
    }
    
    // Configurar búsqueda en tiempo real
    const searchInput = document.getElementById('searchProfessor');
    if (searchInput) {
        /**
         * Event listener para búsqueda en tiempo real
         * Se ejecuta con cada tecla presionada en el campo de búsqueda
         * @param {Event} e - Evento de entrada de texto
         */
        searchInput.addEventListener('input', function() {
            filterProfessors(this.value); // Filtrar profesores según el texto ingresado
        });
    }
});

// ==============================================
// 2. OPERACIONES CRUD DE PROFESORES
// ==============================================

/**
 * Carga y muestra la lista de profesores en la tabla
 * Utiliza datos de ejemplo para demostración del sistema
 * @returns {void}
 */
function loadProfessors() {
    // Obtener referencia al cuerpo de la tabla de profesores
    const tableBody = document.querySelector('#professorsTable tbody');
    
    // Verificar que la tabla existe en la página actual
    if (tableBody) {
        /**
         * Array de datos de ejemplo para demostración
         * En un sistema real, estos datos vendrían de una API o base de datos
         * @type {Array<Object>}
         * @property {number} id - Identificador único del profesor
         * @property {string} name - Nombre completo del profesor
         * @property {string} email - Correo electrónico institucional
         * @property {string} phone - Número de teléfono de contacto
         * @property {string} status - Estado del profesor (active/inactive)
         */
        const professors = [
            { 
                id: 1, 
                name: 'Prof. Juan Pérez', 
                email: 'juan.perez@institucion.edu', 
                phone: '555-0101', 
                status: 'active' 
            },
            { 
                id: 2, 
                name: 'Prof. María García', 
                email: 'maria.garcia@institucion.edu', 
                phone: '555-0102', 
                status: 'active' 
            },
            { 
                id: 3, 
                name: 'Prof. Carlos López', 
                email: 'carlos.lopez@institucion.edu', 
                phone: '555-0103', 
                status: 'inactive' 
            }
        ];
        
        // Limpiar el contenido actual de la tabla
        tableBody.innerHTML = '';
        
        /**
         * Iterar sobre cada profesor y crear una fila en la tabla
         * @param {Object} prof - Objeto con los datos del profesor
         */
        professors.forEach(prof => {
            // Crear elemento tr (table row) para cada profesor
            const row = document.createElement('tr');
            
            /**
             * Crear el HTML interno de la fila con los datos del profesor
             * Se utiliza template literal para interpolar variables
             * Se aplica clase CSS condicional según el estado del profesor
             */
            row.innerHTML = `
                <td>${prof.id}</td>
                <td>${prof.name}</td>
                <td>${prof.email}</td>
                <td>${prof.phone}</td>
                <td class="${prof.status === 'active' ? 'status-present' : 'status-absent'}">
                    ${prof.status === 'active' ? 'Activo' : 'Inactivo'}
                </td>
                <td>
                    <button class="btn btn-small" onclick="editProfessor(${prof.id})">Editar</button>
                    <button class="btn btn-small btn-secondary" onclick="deleteProfessor(${prof.id})">Eliminar</button>
                </td>
            `;
            
            // Agregar la fila creada al cuerpo de la tabla
            tableBody.appendChild(row);
        });
    }
}

// ==============================================
// 3. GESTIÓN DE MODALES
// ==============================================

/**
 * Abre el modal para agregar un nuevo profesor
 * Configura el modal en estado "nuevo" y restablece el formulario
 * @returns {void}
 */
function openAddProfessorModal() {
    // Actualizar el título del modal para indicar creación de nuevo profesor
    document.getElementById('modalTitle').textContent = 'Agregar Profesor';
    
    // Limpiar el formulario para asegurar que empiece vacío
    document.getElementById('professorForm').reset();
    
    // Mostrar el modal cambiando su estilo display a 'block'
    document.getElementById('professorModal').style.display = 'block';
}

/**
 * Cierra el modal de profesores
 * Oculta el modal restableciendo su display a 'none'
 * @returns {void}
 */
function closeProfessorModal() {
    // Ocultar el modal cambiando su estilo display a 'none'
    document.getElementById('professorModal').style.display = 'none';
}

// ==============================================
// 4. FUNCIONALIDADES DE BÚSQUEDA Y FILTRADO
// ==============================================

/**
 * Filtra la lista de profesores en tiempo real según el término de búsqueda
 * Busca coincidencias en nombre y email de los profesores
 * @param {string} searchTerm - Término de búsqueda ingresado por el usuario
 * @returns {void}
 */
function filterProfessors(searchTerm) {
    // Obtener todas las filas de la tabla de profesores
    const rows = document.querySelectorAll('#professorsTable tbody tr');
    
    /**
     * Iterar sobre cada fila y mostrar/ocultar según coincidencia con búsqueda
     * @param {HTMLTableRowElement} row - Fila individual de la tabla
     */
    rows.forEach(row => {
        // Obtener texto de las celdas de nombre y email (columnas 1 y 2)
        const name = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        const search = searchTerm.toLowerCase();
        
        // Mostrar fila si coincide con búsqueda, ocultar si no coincide
        if (name.includes(search) || email.includes(search)) {
            row.style.display = ''; // Mostrar fila
        } else {
            row.style.display = 'none'; // Ocultar fila
        }
    });
}

// ==============================================
// 5. FUNCIONES DE EDICIÓN Y ELIMINACIÓN
// ==============================================

/**
 * Guarda un nuevo profesor o actualiza uno existente
 * Captura los datos del formulario y procesa el guardado
 * @returns {void}
 */
function saveProfessor() {
    // Capturar valores de todos los campos del formulario
    const name = document.getElementById('profName').value;
    const email = document.getElementById('profEmail').value;
    const phone = document.getElementById('profPhone').value;
    const status = document.getElementById('profStatus').value;
    
    /**
     * EN UN SISTEMA REAL, AQUÍ SE IMPLEMENTARÍA:
     * 1. Validación avanzada de campos (email válido, teléfono correcto, etc.)
     * 2. Envío de datos al servidor mediante API
     * 3. Manejo de respuestas del servidor (éxito/error)
     * 4. Actualización de la interfaz según la respuesta
     */
    
    // Simulación de guardado - mostrar datos en consola
    console.log('Guardando profesor:', { name, email, phone, status });
    
    /**
     * Ejemplo de implementación real con fetch:
     * 
     * try {
     *     const method = currentEditingId ? 'PUT' : 'POST';
     *     const url = currentEditingId ? `/api/professors/${currentEditingId}` : '/api/professors';
     *     
     *     const response = await fetch(url, {
     *         method: method,
     *         headers: {
     *             'Content-Type': 'application/json',
     *         },
     *         body: JSON.stringify({
     *             name: name,
     *             email: email,
     *             phone: phone,
     *             status: status
     *         })
     *     });
     *     
     *     if (response.ok) {
     *         const savedProfessor = await response.json();
     *         showSuccessMessage('Profesor guardado correctamente');
     *         closeProfessorModal();
     *         loadProfessors(); // Recargar lista actualizada
     *     } else {
     *         throw new Error('Error al guardar el profesor');
     *     }
     * } catch (error) {
     *     console.error('Error:', error);
     *     showErrorMessage('No se pudo guardar el profesor');
     * }
     */
    
    // Mostrar mensaje de confirmación al usuario
    alert('Profesor guardado correctamente');
    
    // Cerrar el modal después del guardado exitoso
    closeProfessorModal();
    
    // Recargar la lista de profesores para reflejar los cambios
    loadProfessors();
}

/**
 * Prepara el modal para editar un profesor existente
 * En esta versión simula la carga de datos, en producción cargaría desde el servidor
 * @param {number} id - Identificador único del profesor a editar
 * @returns {void}
 */
function editProfessor(id) {
    /**
     * EN UN SISTEMA REAL, AQUÍ SE IMPLEMENTARÍA:
     * 1. Cargar datos del profesor desde el servidor
     * 2. Llenar el formulario con los datos existentes
     * 3. Configurar el modo edición (guardar ID del profesor editado)
     */
    
    // Actualizar título del modal para indicar modo edición
    document.getElementById('modalTitle').textContent = 'Editar Profesor';
    
    // Mostrar el modal
    document.getElementById('professorModal').style.display = 'block';
    
    /**
     * Simulación de carga de datos - en producción estos datos vendrían del servidor
     * Aquí se utilizan datos de ejemplo para demostración
     */
    document.getElementById('profName').value = 'Prof. Juan Pérez';
    document.getElementById('profEmail').value = 'juan.perez@institucion.edu';
    document.getElementById('profPhone').value = '555-0101';
    document.getElementById('profStatus').value = 'active';
    
    /**
     * EN UNA IMPLEMENTACIÓN COMPLETA:
     * currentEditingId = id; // Guardar ID para usar en saveProfessor()
     */
}

/**
 * Elimina un profesor después de confirmación del usuario
 * @param {number} id - Identificador único del profesor a eliminar
 * @returns {void}
 */
function deleteProfessor(id) {
    /**
     * Solicitar confirmación del usuario antes de proceder con la eliminación
     * @param {string} message - Mensaje de confirmación
     * @returns {boolean} True si el usuario confirma, false si cancela
     */
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
        /**
         * EN UN SISTEMA REAL, AQUÍ SE IMPLEMENTARÍA:
         * 1. Enviar solicitud DELETE al servidor
         * 2. Manejar respuesta del servidor
         * 3. Actualizar interfaz según el resultado
         */
        
        // Simulación de eliminación - mostrar en consola
        console.log('Eliminando profesor con ID:', id);
        
        /**
         * Ejemplo de implementación real con fetch:
         * 
         * try {
         *     const response = await fetch(`/api/professors/${id}`, {
         *         method: 'DELETE'
         *     });
         *     
         *     if (response.ok) {
         *         showSuccessMessage('Profesor eliminado correctamente');
         *         loadProfessors(); // Recargar lista actualizada
         *     } else {
         *         throw new Error('Error al eliminar el profesor');
         *     }
         * } catch (error) {
         *     console.error('Error:', error);
         *     showErrorMessage('No se pudo eliminar el profesor');
         * }
         */
        
        // Mostrar mensaje de confirmación al usuario
        alert('Profesor eliminado correctamente');
        
        // Recargar la lista de profesores para reflejar los cambios
        loadProfessors();
    }
}