// File: frontend/src/DataFetcher.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data');
                setData(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Data from Backend:</h1>
            <p>{data}</p>
        </div>
    );
};

export default DataFetcher;
