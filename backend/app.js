const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunosRoutes = require('./routes/alunos');
const cursosRoutes = require('./routes/cursos');
const setupSwagger = require('./docs/swagger');
require('dotenv').config();  // ← Para carregar o .env localmente

const app = express();

// Conexão com o MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://fernandooliveira:HenriqueForte1@universidade.oht8tgk.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Middleware
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: [
    'https://trab1-restapi-fernando-oliveira-pxo.vercel.app/', // Frontend no Vercel
    'https://trab1-restapi-fernando-oliveira.onrender.com', // Backend no Render
    'http://localhost:5500' // Frontend local
  ]
}));

// Rotas
app.use('/api/alunos', alunosRoutes); // Rota para alunos
app.use('/api/cursos', cursosRoutes); // Rota para cursos

// Swagger
setupSwagger(app);
app.get('/', (req, res) => {
  res.send('API está rodando! Acesse <a href="/api-docs">/api-docs</a> para a documentação.');
});

// Inicia o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger em http://localhost:${PORT}/api-docs`);
});
