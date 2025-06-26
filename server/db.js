const mysql = require('mysql2/promise');
const router = require("./routes/events");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'chrisF',
    password: 'Chrisqweasd123!',
    database: 'sports_ticket_appdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;