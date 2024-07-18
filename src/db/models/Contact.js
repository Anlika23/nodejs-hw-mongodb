import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { phoneNumberRegexp, emailRegexp, typeList } from '../../constants/contacts-constants.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: phoneNumberRegexp,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      trim: true,
      lowercase: true,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


contactsSchema.post('save', mongooseSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', contactsSchema);
