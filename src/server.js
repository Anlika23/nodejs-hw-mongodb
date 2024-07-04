import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const port = Number(env('PORT', '3000'));

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

  // app.get('/contacts', getContacts);

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Contacts retrieved successfully',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: `Contact with id=${contactId} not found`
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id=${contactId}`,
        data: contact,
      });
    } catch (error) {
      if (error.message.includes('Cast to ')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({
        message: error.message
      });
    }
  });

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
