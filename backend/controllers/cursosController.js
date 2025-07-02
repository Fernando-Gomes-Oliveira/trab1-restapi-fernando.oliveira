const Curso = require('../models/Curso');

// Lista todos os cursos (GET /api/cursos)
exports.listarCursos = async (req, res) => {
    try {
        const cursos = await Curso.find(); // busca todos os cursos no MongoDB
        res.status(200).json(cursos);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar cursos", error: err.message });
    }
};

// Cria um novo curso (POST /api/cursos)
exports.criarCurso = async (req, res) => {
    try {
        const { nomeDoCurso } = req.body;

        if (!nomeDoCurso) {
            return res.status(400).json({ message: "O nome do curso é obrigatório!" });
        }

        const novoCurso = new Curso({ nomeDoCurso });
        await novoCurso.save();
        res.status(201).json(novoCurso);
    } catch (err) {
        res.status(400).json({ message: "Erro ao criar curso", error: err.message });
    }
};
