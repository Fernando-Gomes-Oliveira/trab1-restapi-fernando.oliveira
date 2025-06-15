// controllers/alunos.js
const Aluno = require('../models/Aluno');

// Listar todos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Criar novo
exports.criarAluno = async (req, res) => {
  try {
    const novoAluno = await Aluno.create(req.body);
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};