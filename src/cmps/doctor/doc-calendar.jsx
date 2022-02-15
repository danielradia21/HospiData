import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function DocCalendar() {
    const today = new Date();
    const [events, setEvents] = useState([]);
    const { user } = useSelector((state) => state.userModule);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        const events = user.meetings.filter(
            (meet) => meet.status !== 'pending' && meet.status !== 'cancelled'
        );
        const newEvents = events.map(
            (ev) =>
                (ev = {
                    title: ev.patient.fullname,
                    start: new Date(+ev.date),
                    end: new Date(+ev.date + 60 * 15 * 1000),
                })
        );
        setEvents((prev) => (prev = newEvents));
    };

    const locales = {
        'en-US': require('date-fns/locale/en-US'),
    };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className='doc-calendar'
        
            defaultView="day"
            step={6} 
            timeslots={5}
            views={['day', 'week', 'month']}
            min={
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    8
                )
            }
            max={
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    18
                )
            }
        />
    );
}
