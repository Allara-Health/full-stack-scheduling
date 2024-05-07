const express = require('express');
const router = express.Router();

// Mock data for providers
let providers = [
    { id: 1, name: "Dr. Scooby Doo", availabilityStart: "08:00", availabilityEnd: "18:00", timeZone: "EST" },
    { id: 2, name: "Dr. Shaggy Rogers", availabilityStart: "09:00", availabilityEnd: "17:00", timeZone: "PST" }
];

// Get all providers
router.get('/', (req, res) => {
    res.json(providers);
});

// Add a new provider
router.post('/', (req, res) => {
    const { name, availabilityStart, availabilityEnd, timeZone } = req.body;
    const newProvider = {
        id: providers.length + 1,
        name,
        availabilityStart,
        availabilityEnd,
        timeZone
    };
    providers.push(newProvider);
    res.status(201).json(newProvider);
});

module.exports = router;
