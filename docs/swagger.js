const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Departamento de Polícia',
    version: '1.0.0',
    description: 'API para gerenciamento de agentes e casos policiais fictícios',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Pega as anotações Swagger das rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
