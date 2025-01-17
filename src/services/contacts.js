
import { ContactsCollection } from '../db/models/Contact.js';
import { contactsFieldList, sortOrderList } from '../constants/constants.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = contactsFieldList[0],
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page-1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();


  const contactsCount = await ContactsCollection.find().countDocuments();

  const paginationData = calcPaginationData({
    total: contactsCount,
    page,
    perPage,
  });
  return {
    data: contacts,
    ...paginationData
  };
};

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
  };

  export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  };

  export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
         _id: contactId
        });
    return contact;
  };
