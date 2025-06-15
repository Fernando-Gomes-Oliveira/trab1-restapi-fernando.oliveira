// backend/routes/alunos.js
const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno'); // Seu modelo Mongoose

// POST /alunos - Cria um novo aluno no MongoDB
router.post('/', async (req, res) => {
    try {
        const novoAluno = await Aluno.create(req.body);
        res.status(201).json(novoAluno); // Retorna o aluno criado
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

module.exports = router;