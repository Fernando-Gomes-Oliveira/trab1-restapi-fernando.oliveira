const express = require('express');
const mongoose = require('mongoose');
const alunosRoutes = require('./routes/alunos'); // Importa as rotas de alunos
const setupSwagger = require('./docs/swagger'); // Importa o Swagger

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://fernandooliveira:HenriqueForte1@universidade.oht8tgk.mongodb.net/')
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar:", err));

// Middleware
app.use(express.json());

// Rotas
app.use('/api/alunos', alunosRoutes);

// Swagger
setupSwagger(app); // Configura o Swagger

// Inicia o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});