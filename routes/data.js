import express from 'express';
const router = express.Router();
import Data from '../models/Data.js';


router.get('/', async (req, res) => {
    try {
        const latestData = await Data.find().sort({ date: -1 }).limit(10); // Last 10 entries
        res.json(latestData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { weight1, weight2, timestamp } = req.body;

    try {
        const newData = new Data({ weight1, weight2, timestamp });
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


export default router;