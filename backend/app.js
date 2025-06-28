const express = require('express');
const router = express.Router();
const Aluno = require('./models/Aluno.js'); // Importa o modelo Mongoose
const alunosController = require('./controllers/alunosController.js'); // Importa o controlador de alunos
const setupSwagger = require('./docs/swagger.js'); // Importa a configuração do Swagger
setupSwagger(app);