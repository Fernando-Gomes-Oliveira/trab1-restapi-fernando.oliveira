const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursosController');

// Apenas leitura de cursos (GET)
router.get('/', ctrl.listar);

module.exports = router;
