import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import env from './utils/env.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import router from './routers/index.js';

const port = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());
  app.use(express.json());

  app.use(cookieParser());

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
