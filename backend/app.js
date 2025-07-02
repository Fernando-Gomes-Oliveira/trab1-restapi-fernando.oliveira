const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Adicione esta linha
const alunosRoutes = require('./routes/alunos'); // Importa as rotas de alunos
const setupSwagger = require('./docs/swagger'); // Importa o Swagger

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://fernandooliveira:HenriqueForte1@universidade.oht8tgk.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar:", err));

// Middleware
app.use(express.json());

// Configuração do CORS 
app.use(cors({
  origin: [
    'https://trab1-restapi-fern-git-894f14-fernando-gomes-oliveiras-projects.vercel.app', // URL do frontend no Vercel
    'https://trab1-restapi-fernando-oliveira.onrender.com', // URL do backend no Render
    'http://localhost:5500' // URL do frontend local
  ]
}));

// Rotas
app.use('/api/alunos', alunosRoutes);

// Swagger
setupSwagger(app); // Configura o Swagger
app.get('/', (req, res) => {
  res.send('API está rodando! Acesse <a href="/api-docs">/api-docs</a> para a documentação.');
});
// Inicia o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});