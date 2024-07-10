import { Router } from 'express';

import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController,
  } from '../controllers/contacts.js';

  import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const contactsRouret = Router();

contactsRouret.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouret.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

contactsRouret.post('/contacts', ctrlWrapper(createContactController));

contactsRouret.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

contactsRouret.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouret;
