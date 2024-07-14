import Joi from "joi";

import {
    phoneNumberRegexp,
    emailRegexp,
    typeList
 } from '../constants/constants.js';

export const createContactsShema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber:Joi.string()
        .min(3)
        .max(20)
        .pattern(phoneNumberRegexp)
        .required(),
    email: Joi.string()
        .min(3)
        .max(20)
        .pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .min(3)
        .max(20)
        .valid(...typeList),
});

export const updateContactShema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .email()
        .required(),
    phoneNumber:Joi.string()
        .min(3)
        .max(20)
        .pattern(phoneNumberRegexp)
        .required(),
    email: Joi.string().min(3).max(20).pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .min(3)
        .max(20)
        .valid(...typeList),
});
