document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://trab1-restapi-fernando-oliveira.onrender.com/'; // URL do backend
    const alunoForm = document.getElementById('alunoForm');
    const alunosList = document.getElementById('alunosList');
    const cursoSelect = document.getElementById('curso');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnCancelar = document.getElementById('btnCancelar');
    
    let editando = false;
    let alunoEditId = null;

    // Carregar cursos ao iniciar
    carregarCursos();
    
    // Carregar alunos ao iniciar
    carregarAlunos();

    // Evento de submit do formulário
    alunoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const aluno = {
            nome: document.getElementById('nome').value,
            apelido: document.getElementById('apelido').value,
            curso: cursoSelect.value,
            anoCurricular: parseInt(document.getElementById('anoCurricular').value)
        };

        if (editando) {
            atualizarAluno(alunoEditId, aluno);
        } else {
            adicionarAluno(aluno);
        }
    });

    // Evento do botão cancelar
    btnCancelar.addEventListener('click', function() {
        cancelarEdicao();
    });

    // Função para carregar cursos
    async function carregarCursos() {
        try {
            const response = await fetch(`${API_URL}/cursos`);
            const cursos = await response.json();
            
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.nomeDoCurso;
                option.textContent = curso.nomeDoCurso;
                cursoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
        }
    }

    // Função para carregar alunos
    async function carregarAlunos() {
        try {
            const response = await fetch(`${API_URL}/alunos`);
            const alunos = await response.json();
            
            alunosList.innerHTML = '';
            
            alunos.forEach(aluno => {
                if (aluno.nome) { // Só mostra alunos com nome (evita os incompletos)
                    const alunoCard = document.createElement('div');
                    alunoCard.className = 'aluno-card';
                    
                    alunoCard.innerHTML = `
                        <div class="aluno-info">
                            <h3>${aluno.nome} ${aluno.apelido}</h3>
                            <p><strong>Curso:</strong> ${aluno.curso}</p>
                            <p><strong>Ano Curricular:</strong> ${aluno.anoCurricular}</p>
                        </div>
                        <div class="aluno-actions">
                            <button class="editar-btn" data-id="${aluno.id}">Editar</button>
                            <button class="remover-btn" data-id="${aluno.id}">Remover</button>
                        </div>
                    `;
                    
                    alunosList.appendChild(alunoCard);
                }
            });

            // Adicionar eventos aos botões de editar e remover
            document.querySelectorAll('.editar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    editarAluno(this.getAttribute('data-id'));
                });
            });

            document.querySelectorAll('.remover-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    removerAluno(this.getAttribute('data-id'));
                });
            });
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
        }
    }

    // Função para adicionar aluno
    async function adicionarAluno(aluno) {
        try {
            const response = await fetch(`${API_URL}/alunos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            
            if (response.ok) {
                carregarAlunos();
                alunoForm.reset();
            }
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
        }
    }

    // Função para editar aluno
    async function editarAluno(id) {
        try {
            const response = await fetch(`${API_URL}/alunos/${id}`);
            const aluno = await response.json();
            
            document.getElementById('alunoId').value = id;
            document.getElementById('nome').value = aluno.nome;
            document.getElementById('apelido').value = aluno.apelido;
            document.getElementById('curso').value = aluno.curso;
            document.getElementById('anoCurricular').value = aluno.anoCurricular;
            
            btnSalvar.textContent = 'Atualizar Aluno';
            btnCancelar.style.display = 'inline-block';
            
            editando = true;
            alunoEditId = id;
        } catch (error) {
            console.error('Erro ao carregar aluno para edição:', error);
        }
    }

    // Função para atualizar aluno
    async function atualizarAluno(id, aluno) {
        try {
            const response = await fetch(`${API_URL}/alunos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            
            if (response.ok) {
                carregarAlunos();
                cancelarEdicao();
            }
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
        }
    }

    // Função para remover aluno
    async function removerAluno(id) {
        if (confirm('Tem certeza que deseja remover este aluno?')) {
            try {
                const response = await fetch(`${API_URL}/alunos/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    carregarAlunos();
                }
            } catch (error) {
                console.error('Erro ao remover aluno:', error);
            }
        }
    }

    // Função para cancelar edição
    function cancelarEdicao() {
        alunoForm.reset();
        btnSalvar.textContent = 'Adicionar Aluno';
        btnCancelar.style.display = 'none';
        editando = false;
        alunoEditId = null;
    }
});