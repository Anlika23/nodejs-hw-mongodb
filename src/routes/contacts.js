import express from 'express';
import { Contact } from '../models/Сontact.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;





