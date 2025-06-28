const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração dinâmica da URL
const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction 
  ? 'https://sua-api.onrender.com'  // Substitua pelo URL do seu serviço no Render
  : 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Alunos',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: serverUrl,
        description: isProduction ? 'Servidor no Render' : 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};