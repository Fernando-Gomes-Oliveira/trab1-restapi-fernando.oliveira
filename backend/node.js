const mongoose = require('mongoose');
require('dotenv').config();
const Curso = require('./models/Curso'); // ajuste o caminho se precisar

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB, criando cursos...');

    const cursos = [
      { nomeDoCurso: 'Engenharia De Redes E sistemas de Computadores' },
      { nomeDoCurso: 'Engenharia Informatica' },
      { nomeDoCurso: 'Criminologia' },
      { nomeDoCurso: 'Farmacia' }
    ];

    await Curso.insertMany(cursos);
    console.log('Cursos inseridos com sucesso!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Erro ao conectar:', err));
