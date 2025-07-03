const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

router.post('/', async (req, res) => {
    const {email} = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).send({message: "invalid email address"})
    }

    try {
        const [existing] = await db.query(
            "SELECT * FROM subscribers WHERE email = ?",
            [email]
        )

        if (existing.length > 0) {
            return res.status(409).send({message: "Email already subscribed"})
        }

        await db.query("INSERT INTO subscribers (email) VALUES (?)", [email]);

        const mailOptions = {
            from: `"Event App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Newsletter Subscription",
            html: `
                <h3>Thank you for subscribing!</h3>
                <p>We'll keep you posted with exciting updates.</p>
                `
        }

        await transporter.sendMail(mailOptions);

        res.status(200).send({message: "Subscribed and email sent" })
    } catch (err) {
        console.error("Subscription error:", err);
        res.status(500).send({message: "Server Error"});
    }
})

module.exports = router;