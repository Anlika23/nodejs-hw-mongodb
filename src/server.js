import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import env from './utils/env.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import router from './routers/contacts.js';

const port = env('PORT', '3000');

 const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the API!',
    });
  });

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);


  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
