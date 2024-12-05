import Joi from "joi";

import {
    phoneNumberRegexp,
    emailRegexp,
    typeList
 } from '../constants/contacts-constants.js';

export const createContactsShema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of 3',
        'string.max': 'Name should have a maximum length of 20',
        'any.required': 'Name is required'
    }),
    phoneNumber:Joi.string()
        .min(3)
        .max(20)
        .pattern(phoneNumberRegexp)
        .required()
        .messages({
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number cannot be empty',
            'string.min': 'Phone number should have a minimum length of 3',
            'string.max': 'Phone number should have a maximum length of 20',
            'string.pattern.base': 'Phone number format is invalid',
            'any.required': 'Phone number is required'
        }),
    email: Joi.string()
        .min(3)
        .max(20)
        .pattern(emailRegexp)
        .messages({
            'string.email': 'Email format is invalid',
            'string.min': 'Email should have a minimum length of 3',
            'string.max': 'Email should have a maximum length of 20',
            'string.pattern.base': 'Email format is invalid'
        }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .min(3)
        .max(20)
        .valid(...typeList)
        .messages({
            'string.base': 'Contact type must be a string',
            'string.min': 'Contact type should have a minimum length of 3',
            'string.max': 'Contact type should have a maximum length of 20',
            'any.only': 'Invalid contact type'
        }),
});

export const updateContactShema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .optional()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of 3',
            'string.max': 'Name should have a maximum length of 20'
        }),
    phoneNumber:Joi.string()
        .min(3)
        .max(20)
        .pattern(phoneNumberRegexp)
        .optional()
        .messages({
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number cannot be empty',
            'string.min': 'Phone number should have a minimum length of 3',
            'string.max': 'Phone number should have a maximum length of 20',
            'string.pattern.base': 'Phone number format is invalid'
        }),
    email: Joi.string()
        .min(3)
        .max(20)
        .pattern(emailRegexp)
        .optional()
        .messages({
            'string.email': 'Email format is invalid',
            'string.min': 'Email should have a minimum length of 3',
            'string.max': 'Email should have a maximum length of 20',
            'string.pattern.base': 'Email format is invalid'
        }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .min(3)
        .max(20)
        .valid(...typeList)
        .optional()
        .messages({
            'string.base': 'Contact type must be a string',
            'string.min': 'Contact type should have a minimum length of 3',
            'string.max': 'Contact type should have a maximum length of 20',
            'any.only': 'Invalid contact type'
        }),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');
