import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/';

const App = () => {
  const [providers, setProviders] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [name, setName] = useState('');
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');

  useEffect(() => {
    fetch(`${API_URL}providers`)
      .then(response => response.json())
      .then(data => setProviders(data))
      .catch(error => console.error('Error fetching providers:', error));
  }, []);

  const handleAddProvider = () => {
    fetch(`${API_URL}providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, availabilityStart, availabilityEnd }),
    })
      .then(response => response.json())
      .then(newProvider => setProviders([...providers, newProvider]))
      .catch(error => console.error('Error adding provider:', error));
  };

  const fetchSchedule = () => {
    fetch(`${API_URL}schedule`)
      .then(response => response.json())
      .then(data => setSchedule(data.schedule))
      .catch(error => console.error('Error fetching schedule:', error));
  };

  return (
    <div className="App">
      <h1>Telehealth Scheduling System</h1>
      <div>
        <h2>Add Provider</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Availability Start"
          value={availabilityStart}
          onChange={e => setAvailabilityStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="Availability End"
          value={availabilityEnd}
          onChange={e => setAvailabilityEnd(e.target.value)}
        />
        <button onClick={handleAddProvider}>Add Provider</button>
      </div>
      <div>
        <h2>Providers</h2>
        <ul>
          {providers.map(provider => (
            <li key={provider.id}>
              {provider.name} ({provider.availabilityStart} - {provider.availabilityEnd})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Schedule</h2>
        <button onClick={fetchSchedule}>Get Schedule</button>
        <ul>
          {Object.entries(schedule).map(([provider, times]) => (
            <li key={provider}>
              <strong>{provider}</strong>
              <ul>
                {times.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;