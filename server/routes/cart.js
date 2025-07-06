const express = require('express');
const router = express.Router();
const db = require('../db');

// Κράτηση εισιτηρίων
router.post('/', async (req, res) => {
    const { eventId, quantity } = req.body;

    if (!eventId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // Κλείδωμα γραμμής του event
        const [[event]] = await conn.query(
            `SELECT availableTickets, price FROM events WHERE id = ? FOR UPDATE`,
            [eventId]
        );

        if (!event || event.availableTickets < quantity) {
            await conn.rollback();
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        // Μείωση διαθέσιμων εισιτηρίων
        await conn.query(
            `UPDATE events SET availableTickets = availableTickets - ? WHERE id = ?`,
            [quantity, eventId]
        );

        // Εισαγωγή tickets
        const ticketValues = Array.from({ length: quantity }, () => [eventId, event.price, 'reserved']);
        const [insertResult] = await conn.query(
            `INSERT INTO tickets (events_id, price, status) VALUES ?`,
            [ticketValues]
        );

        // Ανάκτηση των νέων tickets
        const [newTickets] = await conn.query(
            `SELECT * FROM tickets WHERE id >= ? AND id < ?`,
            [insertResult.insertId, insertResult.insertId + quantity]
        );

        await conn.commit();
        res.json({ success: true, tickets: newTickets });
    } catch (err) {
        await conn.rollback();
        console.error('Error reserving tickets:', err);
        res.status(500).json({ error: 'Failed to reserve tickets' });
    } finally {
        conn.release();
    }
});

// Ανάκτηση reserved εισιτηρίων
router.get('/', async (req, res) => {
    try {
        const [tickets] = await db.query(
            `SELECT tickets.*, events.name, events.location, events.date
             FROM tickets
                      JOIN events ON tickets.events_id = events.id
             WHERE tickets.status = 'reserved'`
        );
        res.json(tickets);
    } catch (err) {
        console.error('Error fetching reserved tickets:', err);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Ακύρωση εισιτηρίων
router.post('/cancel', async (req, res) => {
    const { ticketIds } = req.body;

    if (!Array.isArray(ticketIds) || ticketIds.length === 0) {
        return res.status(400).json({ message: 'Invalid ticket IDs' });
    }

    try {
        const placeholders = ticketIds.map(() => '?').join(',');

        // Επιστροφή σε 'available'
        const updateSql = `UPDATE tickets SET status = 'available' WHERE id IN (${placeholders})`;
        const [updateResult] = await db.query(updateSql, ticketIds);

        const selectSql = `SELECT * FROM tickets WHERE id IN (${placeholders})`;
        const [canceledTickets] = await db.query(selectSql, ticketIds);

        res.json({ success: true, released: updateResult.affectedRows, tickets: canceledTickets });
    } catch (err) {
        console.error('Error cancelling reservation:', err);
        res.status(500).json({ error: 'Failed to cancel tickets' });
    }
});

module.exports = router;