import React, { useState } from 'react';
import axios from 'axios';

const AddProviderForm = () => {
    const [name, setName] = useState('');
    const [availabilityStart, setAvailabilityStart] = useState('');
    const [availabilityEnd, setAvailabilityEnd] = useState('');
    const [timeZone, setTimeZone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/providers', { name, availabilityStart, availabilityEnd, timeZone })
            .then(response => {
                alert('Provider added!');
            })
            .catch(error => console.error('Error adding provider:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Provider</h2>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Availability Start:
                <input type="time" value={availabilityStart} onChange={e => setAvailabilityStart(e.target.value)} />
            </label>
            <label>
                Availability End:
                <input type="time" value={availabilityEnd} onChange={e => setAvailabilityEnd(e.target.value)} />
            </label>
            <label>
                Time Zone:
                <input type="text" value={timeZone} onChange={e => setTimeZone(e.target.value)} />
            </label>
            <button type="submit">Add Provider</button>
        </form>
    );
};

export default AddProviderForm;
