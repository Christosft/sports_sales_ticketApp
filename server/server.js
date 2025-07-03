const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const eventRoutes = require('./routes/events');
app.use('/events', eventRoutes);

const ticketsRoutes = require('./routes/cart');
app.use('/cart', ticketsRoutes);

const newsLetterRoutes = require('./routes/newsletter');
app.use('/subscribe', newsLetterRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})