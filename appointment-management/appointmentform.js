import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/appointments', { date, time })
            .then(res => {
                alert('Appointment booked!');
            })
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;
