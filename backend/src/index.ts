import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

interface Provider {
  id: number;
  name: string;
  availabilityStart: string;
  availabilityEnd: string;
}

let providers: Provider[] = [
  { id: 1, name: "Dr. Scooby Doo", availabilityStart: "08:00", availabilityEnd: "18:00" },
  { id: 2, name: "Dr. Shaggy Rogers", availabilityStart: "09:00", availabilityEnd: "17:00" }
];

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function generateAppointments(startTime: string, endTime: string): string[] {
  const appointments: string[] = [];
  let currentTime = parseTime(endTime);

  while (currentTime.getTime() - 30 * 60 * 1000 - 5 * 60 * 1000 >= parseTime(startTime).getTime()) {
    const appointmentStart = new Date(currentTime.getTime() - 30 * 60 * 1000 - 5 * 60 * 1000);
    const appointmentEnd = new Date(currentTime.getTime() - 5 * 60 * 1000);
    appointments.push(`${appointmentStart.toTimeString().substring(0, 5)} - ${appointmentEnd.toTimeString().substring(0, 5)}`);
    currentTime = new Date(currentTime.getTime() - 35 * 60 * 1000);
  }

  return appointments.reverse();
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/providers', (req: Request, res: Response) => {
  res.json(providers);
});

app.post('/providers', (req: Request, res: Response) => {
  const { name, availabilityStart, availabilityEnd } = req.body;
  const newProvider: Provider = {
    id: providers.length + 1,
    name,
    availabilityStart,
    availabilityEnd,
  };
  providers.push(newProvider);
  res.status(201).json(newProvider);
});

app.get('/schedule', (req: Request, res: Response) => {
  const schedule: { [key: string]: string[] } = {};
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