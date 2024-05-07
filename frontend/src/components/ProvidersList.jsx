import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProvidersList = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/providers')
            .then(response => {
                console.log(response.data)
                setProviders(response.data);

            })
            .catch(error => console.error('Error fetching providers:', error));
    }, []);

    return (
        <div>
            <h2>Providers</h2>
            <ul>
                {providers.map(provider => (
                    <li key={provider.id}>{provider.name} - {provider.timeZone}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProvidersList;
