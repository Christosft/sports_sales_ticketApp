const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/checkout', async (req, res) => {
    try {
        const [reservedTickets] = await db.query(
            `SELECT * FROM tickets
             WHERE status = 'reserved'`
        )

        if (reservedTickets.length === 0) {
            return res.status(400).json({message: 'No reserved tickets to checkout'});
        }

        const ticketIds = reservedTickets.map(t => t.id);
        const placeholders = ticketIds.map(() => '?').join(',');

        const updateSql = `UPDATE tickets
                           SET status = 'purchased'
                           WHERE id IN (${placeholders})`;
        await db.query(updateSql, ticketIds);

        res.json({success: true, purchased: ticketIds.length, ticketIds});
    } catch (err) {
        console.error('Error during checkout:', err);
        res.status(500).json({error: 'Checkout failed'});
    }
})

module.exports = router;