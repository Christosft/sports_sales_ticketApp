const express = require('express')
const router = express.Router();
const db = require('../db');

router.get('/football', async (req, res) => {
    try {
        const [events] = await db.query(`SELECT * FROM events WHERE sport = ?`, ['football']);
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to load events"});
    }
})

router.get('/basketball', async (req, res) => {
    try {
        const [events] = await db.query(`SELECT * FROM events WHERE sport = ?`, ['basketball']);
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to load events"});
    }
})

router.get('/tennis', async (req, res) => {
    try {
        const [events] = await db.query(`SELECT * FROM events WHERE sport = ?`, ['tennis']);
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to load events"});
    }
})

module.exports = router;