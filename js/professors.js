// Funcionalidad específica para la gestión de profesores

document.addEventListener('DOMContentLoaded', function() {
    loadProfessors();
    
    const professorForm = document.getElementById('professorForm');
    if (professorForm) {
        professorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfessor();
        });
    }
    
    // Búsqueda en tiempo real
    const searchInput = document.getElementById('searchProfessor');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProfessors(this.value);
        });
    }
});

function loadProfessors() {
    const tableBody = document.querySelector('#professorsTable tbody');
    
    if (tableBody) {
        // Datos de ejemplo
        const professors = [
            { id: 1, name: 'Prof. Juan Pérez', email: 'juan.perez@institucion.edu', phone: '555-0101', status: 'active' },
            { id: 2, name: 'Prof. María García', email: 'maria.garcia@institucion.edu', phone: '555-0102', status: 'active' },
            { id: 3, name: 'Prof. Carlos López', email: 'carlos.lopez@institucion.edu', phone: '555-0103', status: 'inactive' }
        ];
        
        tableBody.innerHTML = '';
        
        professors.forEach(prof => {
            const row = document.createElement('tr');
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
            tableBody.appendChild(row);
        });
    }
}

function filterProfessors(searchTerm) {
    const rows = document.querySelectorAll('#professorsTable tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        const search = searchTerm.toLowerCase();
        
        if (name.includes(search) || email.includes(search)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function openAddProfessorModal() {
    document.getElementById('modalTitle').textContent = 'Agregar Profesor';
    document.getElementById('professorForm').reset();
    document.getElementById('professorModal').style.display = 'block';
}

function closeProfessorModal() {
    document.getElementById('professorModal').style.display = 'none';
}

function saveProfessor() {
    const name = document.getElementById('profName').value;
    const email = document.getElementById('profEmail').value;
    const phone = document.getElementById('profPhone').value;
    const status = document.getElementById('profStatus').value;
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando profesor:', { name, email, phone, status });
    
    alert('Profesor guardado correctamente');
    closeProfessorModal();
    loadProfessors(); // Recargar la lista
}

function editProfessor(id) {
    // Aquí cargaríamos los datos del profesor desde la base de datos
    document.getElementById('modalTitle').textContent = 'Editar Profesor';
    document.getElementById('professorModal').style.display = 'block';
    
    // Datos de ejemplo para la edición
    document.getElementById('profName').value = 'Prof. Juan Pérez';
    document.getElementById('profEmail').value = 'juan.perez@institucion.edu';
    document.getElementById('profPhone').value = '555-0101';
    document.getElementById('profStatus').value = 'active';
}

function deleteProfessor(id) {
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
        // Aquí iría la lógica para eliminar de la base de datos
        console.log('Eliminando profesor con ID:', id);
        alert('Profesor eliminado correctamente');
        loadProfessors(); // Recargar la lista
    }
}