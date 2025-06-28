const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosController');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alunos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Aluno'
 *                 cursos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro no servidor
 */
router.get('/', alunosController.listarAlunos);

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoInput'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', alunosController.criarAluno);

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "e445"
 *         id:
 *           type: string
 *           example: "86cc"
 *         nome:
 *           type: string
 *           example: "Fernando"
 *         apelido:
 *           type: string
 *           example: "Oliveira"
 *         curso:
 *           type: string
 *           example: "Engenharia De Redes E Sistemas De Computadores"
 *         anoCurricular:
 *           type: integer
 *           example: 2
 * 
 *     AlunoInput:
 *       type: object
 *       required:
 *         - nome
 *         - apelido
 *         - curso
 *         - anoCurricular
 *       properties:
 *         nome:
 *           type: string
 *           example: "Fernando"
 *         apelido:
 *           type: string
 *           example: "Oliveira"
 *         curso:
 *           type: string
 *           example: "Engenharia De Redes E Sistemas De Computadores"
 *         anoCurricular:
 *           type: integer
 *           example: 2
 * 
 *     Curso:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "51d2"
 *         id:
 *           type: string
 *           example: "f901"
 *         nomeDoCurso:
 *           type: string
 *           example: "Engenharia Informática"
 */
module.exports = router;