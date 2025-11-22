// Funcionalidad específica para la gestión de avisos

document.addEventListener('DOMContentLoaded', function() {
    const noticeForm = document.getElementById('noticeForm');
    if (noticeForm) {
        noticeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNotice();
        });
    }
});

function openAddNoticeModal() {
    document.getElementById('modalNoticeTitle').textContent = 'Nuevo Aviso';
    document.getElementById('noticeForm').reset();
    document.getElementById('noticeModal').style.display = 'block';
}

function closeNoticeModal() {
    document.getElementById('noticeModal').style.display = 'none';
}

function saveNotice() {
    const title = document.getElementById('noticeTitle').value;
    const content = document.getElementById('noticeContent').value;
    const priority = document.getElementById('noticePriority').value;
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando aviso:', { title, content, priority });
    
    alert('Aviso publicado correctamente');
    closeNoticeModal();
    
    // En un sistema real, aquí se recargarían los avisos
    // loadNotices();
}