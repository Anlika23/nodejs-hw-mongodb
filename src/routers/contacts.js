import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactsShema, updateContactShema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  ctrlWrapper(getAllContactsController)
);

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController)
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(createContactsShema),
  ctrlWrapper(createContactController)
);


contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(patchContactController)
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default contactsRouter;
