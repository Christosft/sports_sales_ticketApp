const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const {id} = require("nodemailer/lib/smtp-connection");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
require('dotenv').config();

const router = express.Router();


//Register
router.post('/register', async (req, res) => {
    const { username, email, password, role, address, province, city, country, phone } = req.body;

    const rawRole = role?.toUpperCase();
    const validRoles = ['ADMIN', 'CUSTOMER'];
    const roleToInsert = validRoles.includes(rawRole) ? rawRole : 'CUSTOMER';

    try {
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).send({message: 'Email already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const [result] = await db.query(
            `INSERT INTO users (
        username, email, password, role,
        address, province, city, country, phone,
        created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                username,
                email,
                hashedPassword,
                roleToInsert,
                address,
                province,
                city,
                country,
                phone
            ]
        );

        const userId = result.insertId;

        const token = crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await db.query(`INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)`,
            [userId, token, expiresAt]
        );

        const verifyUrl = `http://localhost:3001/auth/verify-email?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        })

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Email verification',
            html: `<h2>Hi ${username}</h2>
                   <p>Please verify your email by clicking the link below:</p>
                   <a href="${verifyUrl}">${verifyUrl}</a>
                   <p>This link expires in 1 hour.</p>`
        })

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("❌ Registration error:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})

// email verification
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const [rows] = await db.query('SELECT * FROM email_verifications WHERE token = ?', [token]);
        const record = rows[0];

        if (!record || new Date(record.expires_at) < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await db.query('UPDATE users SET verified = 1 WHERE id = ?', [record.user_id]);
        await db.query('DELETE FROM email_verifications WHERE user_id = ?', [record.user_id]);

        res.status(200).json({ message: 'Email verified successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Verification failed' });
    }
});


//Login
router.post('/login', async (req, res) => {
    const {email, password, role} = req.body;


    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).send({message: 'Invalid credentials'});
        }

        const user = users[0];

        if (!user.verified) {
            return res.status(403).send({message: 'Please verify your email before logging in.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({
            token, user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'Server error'});
    }
})
module.exports = router;