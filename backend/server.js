const express = require('express');
const cors = require('cors');
const providerRoutes = require('./routes/providers');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/providers', providerRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
