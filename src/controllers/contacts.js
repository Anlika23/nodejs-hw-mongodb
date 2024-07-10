import createHttpError from 'http-errors';

import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
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
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById (contactId);

        if(!contact) {
           throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id=${contactId}`,
            data: contact,
        });
    } catch(error) {
        next(error);
    }
};

// Контролер додавання нового контакта до бази даних користувачами додатку
export const createContactController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json({
            status: 201,
            message: `Successfully created a contact`,
            data: contact,
        });
    } catch(error) {
        next(error);
    }
};

// Контролер часткового оновлення контакту за його id користувачами
export const patchContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);

        if (!result) {
           throw createHttpError (404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully patched a contact!',
            data: result.contact,
        });
    } catch (error) {
        next(error);
    }
};

// Контролер видалення контакту
export const deleteContactController = async (req, res, next) => {
    try {
        const {contactId } = req.params;
        const contact = await deleteContact (contactId);

        if (!contact) {
            throw createHttpError (404, 'Contact not found');
        }

        res.status(204).send();
    } catch(error) {
        next(error);
    }
};


