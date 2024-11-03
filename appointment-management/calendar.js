import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/timeslots')  // Fetch time slots from backend
            .then(res => {
                setEvents(res.data.map(slot => ({
                    title: 'Available',
                    start: slot.start_time,
                    end: slot.end_time,
                })));
            });
    }, []);

    return (
        <div>
            <FullCalendar 
                plugins={[dayGridPlugin]} 
                initialView="dayGridMonth" 
                events={events}
            />
        </div>
    );
};

export default Calendar;
