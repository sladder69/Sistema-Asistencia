// ==============================================
// 1. INICIALIZACIÓN Y CONFIGURACIÓN
// ==============================================

/**
 * Event listener que se ejecuta cuando el DOM está completamente cargado
 * Configura los event listeners para el formulario de avisos
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario de creación/edición de avisos
    const noticeForm = document.getElementById('noticeForm');
    
    // Verificar que el formulario existe en la página actual
    if (noticeForm) {
        /**
         * Configurar event listener para el envío del formulario
         * @param {Event} e - Evento de envío del formulario
         */
        noticeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío tradicional del formulario
            
            // Ejecutar función para guardar el aviso
            saveNotice();
        });
    }
});

// ==============================================
// 2. GESTIÓN DE MODALES
// ==============================================

/**
 * Abre el modal para crear un nuevo aviso
 * Configura el modal en estado "nuevo" y restablece el formulario
 * @returns {void}
 */
function openAddNoticeModal() {
    // Actualizar el título del modal para indicar creación de nuevo aviso
    document.getElementById('modalNoticeTitle').textContent = 'Nuevo Aviso';
    
    // Limpiar el formulario para asegurar que empiece vacío
    document.getElementById('noticeForm').reset();
    
    // Mostrar el modal cambiando su estilo display a 'block'
    document.getElementById('noticeModal').style.display = 'block';
    
    /**
     * EN UNA IMPLEMENTACIÓN MÁS AVANZADA, SE PODRÍA:
     * - Enfocar automáticamente el primer campo del formulario
     * - Cargar valores por defecto según el tipo de usuario
     * - Configurar validaciones específicas
     */
}

/**
 * Cierra el modal de avisos
 * Oculta el modal restableciendo su display a 'none'
 * @returns {void}
 */
function closeNoticeModal() {
    // Ocultar el modal cambiando su estilo display a 'none'
    document.getElementById('noticeModal').style.display = 'none';
    
    /**
     * EN UNA IMPLEMENTACIÓN MÁS AVANZADA, SE PODRÍA:
     * - Limpiar mensajes de error previos
     * - Resetear estados de validación
     * - Cerrar cualquier tooltip o mensaje auxiliar
     */
}

// ==============================================
// 3. OPERACIONES CRUD DE AVISOS
// ==============================================

/**
 * Guarda un nuevo aviso capturando los datos del formulario
 * En esta versión simula el guardado, en producción enviaría a un backend
 * @returns {void}
 */
function saveNotice() {
    // Capturar valores de todos los campos del formulario
    const title = document.getElementById('noticeTitle').value;
    const content = document.getElementById('noticeContent').value;
    const priority = document.getElementById('noticePriority').value;
    
    /**
     * EN UN SISTEMA REAL, AQUÍ SE IMPLEMENTARÍA:
     * 1. Validación avanzada de campos
     * 2. Envío de datos al servidor mediante API
     * 3. Manejo de respuestas del servidor
     * 4. Actualización de la interfaz según la respuesta
     */
    
    // Simulación de guardado - mostrar datos en consola
    console.log('Guardando aviso:', { title, content, priority });
    
    /**
     * Ejemplo de implementación real con fetch:
     * 
     * try {
     *     const response = await fetch('/api/notices', {
     *         method: 'POST',
     *         headers: {
     *             'Content-Type': 'application/json',
     *         },
     *         body: JSON.stringify({
     *             title: title,
     *             content: content,
     *             priority: priority,
     *             author: localStorage.getItem('userName'),
     *             date: new Date().toISOString()
     *         })
     *     });
     *     
     *     if (response.ok) {
     *         const newNotice = await response.json();
     *         addNoticeToDOM(newNotice);
     *         showSuccessMessage('Aviso publicado correctamente');
     *     } else {
     *         throw new Error('Error al guardar el aviso');
     *     }
     * } catch (error) {
     *     console.error('Error:', error);
     *     showErrorMessage('No se pudo publicar el aviso');
     * }
     */
    
    // Mostrar mensaje de confirmación al usuario
    alert('Aviso publicado correctamente');
    
    // Cerrar el modal después del guardado exitoso
    closeNoticeModal();
    
    /**
     * En un sistema real, aquí se recargaría la lista de avisos
     * para mostrar el nuevo aviso creado
     */
    // loadNotices();
}

/**
 * FUNCIÓN ADICIONAL PARA CARGAR AVISOS (COMENTADA - PARA IMPLEMENTACIÓN FUTURA)
 * Cargaría los avisos existentes desde el servidor y los mostraría en la interfaz
 */
/*
function loadNotices() {
    // Ejemplo de implementación para cargar avisos
    fetch('/api/notices')
        .then(response => response.json())
        .then(notices => {
            const container = document.querySelector('.notices-container');
            container.innerHTML = '';
            
            notices.forEach(notice => {
                const noticeCard = createNoticeCard(notice);
                container.appendChild(noticeCard);
            });
        })
        .catch(error => {
            console.error('Error cargando avisos:', error);
        });
}
*/

/**
 * FUNCIÓN ADICIONAL PARA CREAR TARJETAS DE AVISOS (COMENTADA - PARA IMPLEMENTACIÓN FUTURA)
 * Crearía el HTML para cada tarjeta de aviso
 */
/*
function createNoticeCard(notice) {
    const card = document.createElement('div');
    card.className = 'notice-card';
    card.innerHTML = `
        <div class="notice-header">
            <h3>${notice.title}</h3>
            <span class="notice-date">${formatDate(notice.date)}</span>
        </div>
        <div class="notice-content">
            <p>${notice.content}</p>
        </div>
        <div class="notice-actions">
            <button class="btn btn-small" onclick="editNotice(${notice.id})">Editar</button>
            <button class="btn btn-small btn-secondary" onclick="deleteNotice(${notice.id})">Eliminar</button>
        </div>
    `;
    return card;
}
*/

/**
 * FUNCIÓN ADICIONAL PARA EDITAR AVISOS (COMENTADA - PARA IMPLEMENTACIÓN FUTURA)
 * Abriría el modal en modo edición con los datos de un aviso existente
 */
/*
function editNotice(noticeId) {
    // Cargar datos del aviso
    fetch(`/api/notices/${noticeId}`)
        .then(response => response.json())
        .then(notice => {
            document.getElementById('modalNoticeTitle').textContent = 'Editar Aviso';
            document.getElementById('noticeTitle').value = notice.title;
            document.getElementById('noticeContent').value = notice.content;
            document.getElementById('noticePriority').value = notice.priority;
            document.getElementById('noticeModal').style.display = 'block';
            
            // Guardar el ID del aviso que se está editando
            currentEditingNotice = noticeId;
        });
}
*/

/**
 * FUNCIÓN ADICIONAL PARA ELIMINAR AVISOS (COMENTADA - PARA IMPLEMENTACIÓN FUTURA)
 * Eliminaría un aviso existente después de confirmación
 */
/*
function deleteNotice(noticeId) {
    if (confirm('¿Está seguro de que desea eliminar este aviso?')) {
        fetch(`/api/notices/${noticeId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    loadNotices(); // Recargar la lista
                    alert('Aviso eliminado correctamente');
                }
            })
            .catch(error => {
                console.error('Error eliminando aviso:', error);
                alert('Error al eliminar el aviso');
            });
    }
}
*/