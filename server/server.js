const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const eventRoutes = require('./routes/events');
app.use('/events', eventRoutes);

const ticketsRoutes = require('./routes/cart');
app.use('/cart', ticketsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})