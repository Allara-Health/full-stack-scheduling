const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let providers = [
    { id: 1, name: "Dr. Scooby Doo", availabilityStart: "08:00", availabilityEnd: "18:00" },
    { id: 2, name: "Dr. Shaggy Rogers", availabilityStart: "09:00", availabilityEnd: "17:00" }
];

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function generateAppointments(startTime, endTime) {
    const appointments = [];
    let currentTime = parseTime(endTime);

    while (currentTime.getTime() - 30 * 60 * 1000 - 5 * 60 * 1000 >= parseTime(startTime).getTime()) {
        const appointmentStart = new Date(currentTime.getTime() - 30 * 60 * 1000 - 5 * 60 * 1000);
        const appointmentEnd = new Date(currentTime.getTime() - 5 * 60 * 1000);
        appointments.push(`${appointmentStart.toTimeString().substring(0, 5)} - ${appointmentEnd.toTimeString().substring(0, 5)}`);
        currentTime = new Date(currentTime.getTime() - 35 * 60 * 1000);
    }

    return appointments.reverse();
}


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/providers', (req, res) => {
    res.json(providers);
});

app.post('/providers', (req, res) => {
    const { name, availabilityStart, availabilityEnd } = req.body;
    const newProvider = {
        id: providers.length + 1,
        name,
        availabilityStart,
        availabilityEnd,
    };
    providers.push(newProvider);
    res.status(201).json(newProvider);
});

app.get('/schedule', (req, res) => {
    console.log("HERE")
    const schedule = {};
    providers.forEach(provider => {
        schedule[provider.name] = generateAppointments(provider.availabilityStart, provider.availabilityEnd);
    });
    res.json({
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: '2-digit', day: '2-digit', year: 'numeric' }),
        schedule
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
