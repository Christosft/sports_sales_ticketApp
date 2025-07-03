const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const {id} = require("nodemailer/lib/smtp-connection");
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
        await db.query(
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
})


//Login
router.post('/login', async (req, res) => {
    const {email, password, role} = req.body;


    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).send({message: 'Invalid credentials'});
        }

        const user = users[0];
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