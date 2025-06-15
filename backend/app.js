// app.js
const express = require('express');
const connectDB = require('./config/db');
const alunoRoutes = require('./routes/alunos');

const app = express();

// Middlewares
app.use(express.json());

// Conexão DB
connectDB();

// Rotas
app.use('/api/alunos', alunoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));