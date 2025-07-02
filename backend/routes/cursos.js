const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursosController');

// Apenas leitura de cursos (GET)
router.get('/', ctrl.listar);

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gerenciamento de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro no servidor
 */
router.get('/', cursosController.listarCursos);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', cursosController.criarCurso);

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "63fd5e"
 *         id:
 *           type: string
 *           example: "abc123"
 *         nomeDoCurso:
 *           type: string
 *           example: "Engenharia Informática"
 * 
 *     CursoInput:
 *       type: object
 *       required:
 *         - nomeDoCurso
 *       properties:
 *         nomeDoCurso:
 *           type: string
 *           example: "Engenharia Informática"
 */

module.exports = router;
