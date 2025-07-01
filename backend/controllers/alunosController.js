const Aluno = require('../models/Aluno');

// Lista todos os alunos (GET /api/alunos)
exports.listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find(); // vai buscar todos os alunos no MongoDB
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar alunos", error: err.message });
    }
};

// Cria um novo aluno (POST /api/alunos)
exports.criarAluno = async (req, res) => {
    try {
        const { nome, apelido, curso, anoCurricular } = req.body;
        
        // Validação simples (opcional)
        if (!nome || !apelido || !curso || !anoCurricular) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const novoAluno = new Aluno({ nome, apelido, curso, anoCurricular });
        await novoAluno.save(); // Salva no MongoDB
        res.status(201).json(novoAluno);
    } catch (err) {
        res.status(400).json({ message: "Erro ao criar aluno", error: err.message });
    }
};