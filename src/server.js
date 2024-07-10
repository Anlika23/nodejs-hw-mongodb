import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import env from './utils/env.js';

import {errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import contactsRouret from './routers/contacts.js';

// Читаємо змінну оточення PORT
const port = Number(env('PORT', '3000'));

// Функція створення сервера
const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty'
    }
  });

  app.use(logger);

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the API!',
    });
  });

  app.use(contactsRouret);

  app.use('*', notFoundHandler);

  app.use(errorHandler);


  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
